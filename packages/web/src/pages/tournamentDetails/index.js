import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

// styles
import useStyles from './styles'

import Typography from '@material-ui/core/Typography'
import {Container} from '@material-ui/core'

import LoadingIndicator from '../../components/LoadingIndicator'
import TournamentDetails from '../../components/TournamentDetails'

import ValorantHero from '../../images/hero/valorant.jpg'
import QuakeChampionsHero from '../../images/hero/quake-champions.jpg'

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
    backgroundImage: `url(${QuakeChampionsHero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundBlendMode: 'multiply',
  },
  shadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  header: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    height: '330px',
    padding: '2.5rem 2.5rem',
  },
}

function Tournament({match}) {
  const classes = useStyles()
  const {loading, error, data} = useQuery(TOURNAMENT, {
    variables: {id: match.params.id},
  })

  if (loading) return <LoadingIndicator />
  if (error) return <p>Error :(</p>

  return (
    <div>
      <div
        className={classes.hero}
        style={{
          backgroundImage: `url(${
            data.tournament.game_name === 'valorant'
              ? ValorantHero
              : QuakeChampionsHero
          })`,
        }}
      >
        <div className={classes.shadow}>
          <Container maxWidth="lg">
            <section className={classes.header}>
              <Typography variant="h6" component="h2">
                {data.tournament.name}
              </Typography>
              <p>{data.tournament.start_at}</p>
            </section>
          </Container>
        </div>
      </div>
      <div>
        <TournamentDetails tournament={data.tournament} />
      </div>
    </div>
  )
}

export default Tournament
