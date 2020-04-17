import {ApolloServer, gql} from 'apollo-server'
import fetch from 'node-fetch'

require('dotenv-safe').config()

const typeDefs = gql`
  scalar Date

  type Tournament {
    accept_attachments: Boolean
    allow_participant_match_reporting: Boolean
    anonymous_voting: Boolean
    category: String
    check_in_duration: Int
    completed_at: Date
    created_at: Date
    created_by_api: Boolean
    credit_capped: Boolean
    description: String
    game_id: Int
    group_stages_enabled: Boolean
    hide_forum: Boolean
    hide_seeds: Boolean
    hold_third_place_match: Boolean
    id: ID!
    max_predictions_per_user: Int
    name: String
    notify_users_when_matches_open: Boolean
    notify_users_when_the_tournament_ends: Boolean
    open_signup: Boolean
    participants_count: Int
    prediction_method: Int
    predictions_opened_at: Date
    private: Boolean
    progress_meter: Int
    pts_for_bye: Int
    pts_for_game_tie: Int
    pts_for_game_win: Int
    pts_for_match_tie: Int
    pts_for_match_win: Int
    quick_advance: Boolean
    ranked_by: String
    require_score_agreement: Boolean
    rr_pts_for_game_tie: Int
    rr_pts_for_game_win: Int
    rr_pts_for_match_tie: Int
    rr_pts_for_match_win: Int
    sequential_pairings: Boolean
    show_rounds: Boolean
    signup_cap: String
    start_at: Date
    started_at: Date
    started_checking_in_at: Date
    state: String
    swiss_rounds: Int
    teams: Boolean
    tie_breaks: String
    tournament_type: String
    updated_at: Date
    url: String
    description_source: String
    subdomain: String
    full_challonge_url: String
    live_image_url: String
    sign_up_url: String
    review_before_finalizing: Boolean
    accepting_predictions: Boolean
    participants_locked: Boolean
    game_name: String
    participants_swappable: Boolean
    team_convertable: Boolean
    group_stages_were_started: Boolean
  }

  type Query {
    tournament(id: String): Tournament
    tournaments: [Tournament]
  }
`

const resolvers = {
  Query: {
    tournament: async (_, {id}) => {
      const response = await fetch(
        `https://${process.env.CHALLONGE_CLIENT_ID}:${process.env.CHALLONGE_API_KEY}@api.challonge.com/v1/tournaments/${id}.json`,
      ).then(res => res.json())

      return response.tournament
    },
    tournaments: async () => {
      const response = await fetch(
        `https://${process.env.CHALLONGE_CLIENT_ID}:${process.env.CHALLONGE_API_KEY}@api.challonge.com/v1/tournaments.json`,
      ).then(res => res.json())

      return response.map(data => data.tournament)
    },
  },
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
