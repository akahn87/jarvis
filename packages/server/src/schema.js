/**
 * The combined schema out of types and resolvers (queries, mutations and subscriptions)
 */
import {makeExecutableSchema} from 'graphql-tools'
import merge from 'lodash/merge'

import scalars from './types/scalars'

import Tournament from './types/Tournament'
import User from './types/User'

import TournamentQueries from './queries/tournament'
import UserQueries from './queries/user'

const Root = /* GraphQL */ `
  type Query {
    dummy: String
  }

  schema {
    query: Query
  }
`

const resolvers = merge(
  {},
  // queries
  TournamentQueries,
  UserQueries,
)

// Create the final GraphQL schema out of the type definitions
// and the resolvers
const schema = makeExecutableSchema({
  typeDefs: [scalars.typeDefs, Root, Tournament, User],
  resolvers,
})

export default schema
