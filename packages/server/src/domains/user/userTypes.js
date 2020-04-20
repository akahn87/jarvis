const User = /* GraphQL */ `
  enum Role {
    ADMIN
    USER
  }

  type User {
    id: ID!
    username: String
    avatar: String
    discriminator: String
    public_flags: Int
    flags: Int
    locale: String
    mfa_enabled: Boolean
    provider: String
    accessToken: String
    fetchedAt: Date
    role: Role
  }

  extend type Query {
    currentUser: User
  }
`

export default User
