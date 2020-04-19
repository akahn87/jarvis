import tournament from './rootTournament'
import tournaments from './rootTournaments'

import signups from './signups'
import gameInfo from './gameInfo'

const resolvers = {
  Query: {
    tournament,
    tournaments,
  },
  Tournament: {
    signups,
    game_info: gameInfo,
  },
}

export default resolvers
