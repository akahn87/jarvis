import express from 'express'
import {join} from 'path'
import {ApolloServer} from 'apollo-server-express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import RateLimit from 'express-rate-limit'
import RateLimitRedisStore from 'rate-limit-redis'
import passport from 'passport'
import cors from 'cors'
import {Strategy as DiscordStrategy} from 'passport-discord'

import db, {sequelize} from './database'
import {redisSessionPrefix} from './constants'
import redis from './redis'
import {rebuildLoaders, gatherDomains} from './utils/fetchDomains'

require('dotenv-safe').config()

const {SESSION_SECRET, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET} = process.env
const RedisStore = connectRedis(session)

const DiscordStrategyCallback = async (
  accessToken,
  refreshToken,
  profile,
  done,
) => {
  let user = await db.User.findOne({discordId: profile.id})

  // no user was found, lets create a new one
  if (!user) {
    user = await db.User.create({
      name: null,
      email: null,
      username: profile.username,
      discordId: profile.id,
      token: accessToken,
      type: 'USER',
    })
  }

  done(null, {
    user,
    accessToken,
    refreshToken,
  })
}

passport.use(
  new DiscordStrategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: '/auth/discord/callback',
    },
    DiscordStrategyCallback,
  ),
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

const startServer = async () => {
  const domainDirs = [join(__dirname, 'domains')]
  const {schema, rawLoaders} = await gatherDomains(domainDirs)

  const app = express()

  app.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis,
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      delayMs: 0, // disable delaying - full speed until the max limit is reached
    }),
  )

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        prefix: redisSessionPrefix,
      }),
      name: 'qid',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    }),
  )

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
  app.use(cors(corsOptions))

  app.use(passport.initialize())
  app.use(passport.session())

  app.get(
    '/auth/discord',
    passport.authenticate('discord', {scope: ['identify']}),
  )
  app.get(
    '/auth/discord/callback',
    passport.authenticate('discord', {
      successRedirect: 'http://localhost:3000',
      failureRedirect: 'http://localhost:3000',
    }),
  )

  const server = new ApolloServer({
    schema,
    context: ({req}) => {
      const loaders = rebuildLoaders(rawLoaders, req)
      const currentUser = req.user || null

      return {
        loaders,
        url: `${req.protocol}://${req.get('host')}`,
        session: req.session,
        req,
        db,
        user: currentUser,
      }
    },
    playground: {
      settings: {
        'request.credentials': 'same-origin',
      },
    },
  })

  server.applyMiddleware({app, cors: false})

  sequelize.sync().then(async () =>
    app.listen({
      port: 4000,
    }),
  )
  console.log('Server is running on localhost:4000')
}

startServer()
