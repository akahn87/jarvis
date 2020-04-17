/**
 * The combined schema out of types and resolvers (queries, mutations and subscriptions)
 */
import {makeExecutableSchema} from 'graphql-tools'
import merge from 'lodash/merge'

import scalars from './types/scalars'

import Tournament from './types/Tournament'

import TournamentQueries from './queries/tournament'

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
)

// Create the final GraphQL schema out of the type definitions
// and the resolvers
const schema = makeExecutableSchema({
  typeDefs: [scalars.typeDefs, Root, Tournament],
  resolvers,
})

export default schema
