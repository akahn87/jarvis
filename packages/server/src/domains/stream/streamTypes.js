const streamTypes = /* GraphQL */ `
  type GameInfo {
    id: String
    name: String
    box_art_url: String
  }

  type StreamUser {
    id: ID!
    user_id: Int
    user_name: String
    game_id: Int
    type: String
    title: String
    viewer_count: Int
    started_at: Date
    language: String
    thumbnail_url: String
    tag_ids: [Int]
  }

  extend type Query {
    searchStreams(query: String): [StreamUser]
    streams: [StreamUser]
    gameInfo(id: String, name: String): GameInfo
  }
`

export default streamTypes
