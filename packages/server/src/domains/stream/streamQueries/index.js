import gameInfo from './rootGameInfo'
import streams from './rootStreams'
import searchStreams from './rootSearchStreams'

const resolvers = {
  Query: {
    gameInfo,
    streams,
    searchStreams,
  },
}

export default resolvers
