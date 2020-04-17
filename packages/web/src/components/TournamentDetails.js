import React from 'react'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

function TournamentDetails({tournament}) {
  return (
    <div data-id={tournament.id}>
      <h2>Teams</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team Name</TableCell>
              <TableCell>Team Captain</TableCell>
              <TableCell>Players</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournament.signups.map(team => {
              return (
                <TableRow>
                  <TableCell>
                    <h2>{team.team_name}</h2>
                  </TableCell>
                  <TableCell>{team.captain.username}</TableCell>
                  <TableCell>
                    {team.players.map(player => (
                      <div>{player.username}</div>
                    ))}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>

      <img
        src={tournament.live_image_url}
        alt={`${tournament.name} Bracket`}
        style={{maxWidth: '100%'}}
      />
    </div>
  )
}

export default TournamentDetails
