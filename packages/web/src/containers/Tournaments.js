import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

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
    }
  }
`

function Tournaments() {
  const {loading, error, data} = useQuery(TOURNAMENTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <h1>Tournaments</h1>
      <TournamentList tournaments={data.tournaments} />
    </div>
  )
}

export default Tournaments
