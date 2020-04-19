import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles'

import Tournaments from './Tournaments'
import Tournament from './Tournament'

import Header from '../components/Header'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

function App() {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Header />
        <Switch>
          <Route path="/" exact component={Tournaments} />
          <Route path="/tournament/:id" exact component={Tournament} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
