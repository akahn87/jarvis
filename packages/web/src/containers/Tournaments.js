import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {Container} from '@material-ui/core'

import LoadingIndicator from '../components/LoadingIndicator'
import TournamentList from '../components/TournamentList'

const TOURNAMENTS = gql`
  query getTournaments {
    tournaments {
      id
      name
      game_name
      teams
      signup_cap
      start_at
      open_signup
      game_info {
        box_art_url
      }
    }
  }
`

function Tournaments() {
  const {loading, error, data} = useQuery(TOURNAMENTS)

  if (loading) return <LoadingIndicator />
  if (error) return <p>Error :(</p>

  return (
    <Container maxWidth="lg">
      <h1>Tournaments</h1>
      <TournamentList tournaments={data.tournaments} />
    </Container>
  )
}

export default Tournaments
