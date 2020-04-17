import {ApolloServer} from 'apollo-server'

import schema from './schema'

require('dotenv-safe').config()

const server = new ApolloServer({schema})

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
