import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

import LoadingIndicator from '../components/LoadingIndicator'
import TournamentDetails from '../components/TournamentDetails'

import Hero from '../images/hero/valorant.jpg'

const TOURNAMENT = gql`
  query getTournament($id: String!) {
    tournament(id: $id) {
      id
      name
      description
      game_name
      teams
      signup_cap
      live_image_url
      signups {
        team_name
        captain {
          username
        }
        players {
          username
        }
      }
    }
  }
`

const styles = {
  hero: {
    backgroundImage: `url(${Hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundBlendMode: 'multiply',
  },
  shadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  header: {
    height: '330px',
  },
}

function Tournament({match}) {
  const {loading, error, data} = useQuery(TOURNAMENT, {
    variables: {id: match.params.id},
  })

  if (loading) return <LoadingIndicator />
  if (error) return <p>Error :(</p>

  return (
    <div>
      <div style={styles.hero}>
        <div style={styles.shadow}>
          <section style={styles.header}></section>
        </div>
      </div>
      <div>
        <TournamentDetails tournament={data.tournament} />
      </div>
    </div>
  )
}

export default Tournament
