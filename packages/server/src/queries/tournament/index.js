import tournament from './rootTournament'
import tournaments from './rootTournaments'

import signups from './signups'

export default {
  Query: {
    tournament,
    tournaments,
  },
  Tournament: {
    signups,
  },
}
