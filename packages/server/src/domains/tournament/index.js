import merge from 'lodash/merge'

import tournamentMutations from './tournamentMutations'
import tournamentQueries from './tournamentQueries'

const resolvers = merge({}, tournamentMutations, tournamentQueries)

export {resolvers}
export {default as types} from './tournamentTypes'
export {default as loaders} from './tournamentLoaders'
