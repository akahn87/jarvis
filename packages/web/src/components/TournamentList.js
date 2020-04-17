import React from 'react'
import {Link} from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Box from '@material-ui/core/Box'

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
                to={`/tournament/${tournament.id}`}
                style={{textDecoration: 'none'}}
              >
                <TableCell>
                  {tournament.game_name}
                  <h2>{tournament.name}</h2>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {tournament.teams ? tournament.teams : 0}
                  {tournament.signup_cap
                    ? '/' + tournament.signup_cap
                    : null}{' '}
                  Teams
                </TableCell>
                <TableCell>
                  <Link to={'/asdf'}>
                    <Box color="success.main">Registrations Open</Box>
                  </Link>
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
