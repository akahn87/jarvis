import React from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'

import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Tournaments from './Tournaments'
import Tournament from './Tournament'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function App() {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <div clkassName={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">Home</Link>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" exact component={Tournaments} />
            <Route path="/tournament/:id" exact component={Tournament} />
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
