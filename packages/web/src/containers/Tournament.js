import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'

import TournamentDetails from '../components/TournamentDetails'

const TOURNAMENT = gql`
  query getTournament($id: String!) {
    tournament(id: $id) {
      id
      name
      game_name
      teams
      signup_cap
      live_image_url
    }
  }
`

function Tournament({match}) {
  const {loading, error, data} = useQuery(TOURNAMENT, {
    variables: {id: match.params.id},
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <h1>{data.tournament.name}</h1>
      <TournamentDetails tournament={data.tournament} />
    </div>
  )
}

export default Tournament
