import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    currentUser {
      id
      username
      role
    }
  }
`

export {CURRENT_USER_QUERY}
