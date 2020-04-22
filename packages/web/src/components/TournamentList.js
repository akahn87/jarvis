import React from 'react'
import {Link} from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

const styles = {
  boxArt: {
    height: '96px',
    marginRight: '10px',
    width: '77px',
  },
}

function TournamentList({tournaments}) {
  return (
    <Paper>
      <Table>
        <TableBody>
          {tournaments.map(tournament => {
            return (
              <TableRow
                component={Link}
                hover={true}
                key={tournament.id}
                to={`/tournaments/${tournament.id}`}
                style={{textDecoration: 'none'}}
              >
                <TableCell>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      {tournament.game_info &&
                        tournament.game_info.box_art_url && (
                          <img
                            style={styles.boxArt}
                            src={tournament.game_info.box_art_url}
                            alt={tournament.game_name}
                          />
                        )}
                    </Grid>
                    <Grid item>
                      <h2>{tournament.name}</h2>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  {tournament.teams ? tournament.teams : 0}
                  {tournament.signup_cap
                    ? '/' + tournament.signup_cap
                    : null}{' '}
                  Teams
                </TableCell>
                <TableCell>
                  {tournament.open_signup ? (
                    <Link to={'/asdf'}>
                      <Box color="success.main">Registration Open</Box>
                    </Link>
                  ) : (
                    <Box color="error.main">Registration Closed</Box>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default TournamentList
