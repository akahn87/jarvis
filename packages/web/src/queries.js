import gql from 'graphql-tag'

const GET_CURRENT_USER = gql`
  {
    currentUser {
      email
    }
  }
`

export {GET_CURRENT_USER}
