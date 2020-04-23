import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import {Container} from '@material-ui/core'

function TabPanel(props) {
  const {children, value, index, ...other} = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function TournamentDetails({tournament}) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Information" {...a11yProps(1)} />
            <Tab label="Teams" {...a11yProps(1)} />
            <Tab label="Match" {...a11yProps(2)} />
            <Tab label="Bracket" {...a11yProps(3)} />
          </Tabs>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography variant="h5" component="h3">
                Description
              </Typography>
              <p dangerouslySetInnerHTML={{__html: tournament.description}}></p>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" component="h3">
                Timezone
              </Typography>
              <p>Bacon </p>

              <Typography variant="h5" component="h3">
                Contact
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
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
        </TabPanel>
        <TabPanel value={value} index={2}>
          Matches
        </TabPanel>
        <TabPanel value={value} index={3}>
          <img
            src={tournament.live_image_url}
            alt={`${tournament.name} Bracket`}
            style={{maxWidth: '100%'}}
          />
        </TabPanel>
      </Container>
    </div>
  )
}

export default TournamentDetails
