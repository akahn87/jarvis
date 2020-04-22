import React from 'react'
import {Route, Switch} from 'react-router-dom'
import classnames from 'classnames'

// styles
import useStyles from './styles'

// components
import Header from '../Header'
import Sidebar from '../Sidebar'

// pages
import Homepage from '../../pages/homepage'
import TournamentDetails from '../../pages/tournamentDetails'
import Tournaments from '../../pages/tournaments'

// context
import {useLayoutState} from '../../context/LayoutContext'

function Layout() {
  const classes = useStyles()

  // global
  const layoutState = useLayoutState()

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/tournaments/" exact component={Tournaments} />
          <Route path="/tournaments/:id" component={TournamentDetails} />
        </Switch>
      </div>
    </div>
  )
}

export default Layout
