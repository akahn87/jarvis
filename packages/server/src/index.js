import express from 'express'
import {join} from 'path'
import {ApolloServer} from 'apollo-server-express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import RateLimit from 'express-rate-limit'
import RateLimitRedisStore from 'rate-limit-redis'

import {redisSessionPrefix} from './constants'
import redis from './redis'
import {rebuildLoaders, gatherDomains} from './utils/fetchDomains'

require('dotenv-safe').config()

const SESSION_SECRET = 'ajslkjalksjdfkl'
const RedisStore = connectRedis(session)

const startServer = async () => {
  const domainDirs = [join(__dirname, 'domains')]
  const {schema, rawLoaders} = await gatherDomains(domainDirs)

  const app = express()
  const server = new ApolloServer({
    schema,
    context: ({req}) => {
      const loaders = rebuildLoaders(rawLoaders, req)

      return {
        loaders,
        url: req.protocol + '://' + req.get('host'),
        session: req.session,
        req,
      }
    },
  })

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
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    }),
  )

  const cors = {
    credentials: true,
    origin: '*',
  }

  server.applyMiddleware({app, cors})

  // server.express.get('/confirm/:id', confirmEmail)

  await app.listen({
    port: 4000,
  })
  console.log('Server is running on localhost:4000')
}

startServer()
