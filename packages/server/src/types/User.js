const User = /* GraphQL */ `
  type User {
    id: ID!
    email: String!
  }

  extend type Query {
    currentUser: User
  }
`

export default User
