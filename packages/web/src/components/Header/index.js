import React from 'react'
import {Menu as MenuIcon, ArrowBack as ArrowBackIcon} from '@material-ui/icons'
import classNames from 'classnames'

// styles
import useStyles from './styles'

import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {Typography} from '@material-ui/core'
import Link from '@material-ui/core/Link'

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../context/LayoutContext'
import {useUser} from '../../context/UserContext'

const HeaderLoginButton = ({currentUser}) => {
  const user = useUser()
  const isLoggedIn = !!user.username

  if (isLoggedIn) {
    return (
      <>
        <Typography>Suh, {user.username}</Typography>
      </>
    )
  }

  return (
    <Typography>
      <Link color="inherit" href="http://localhost:4000/auth/discord">
        Login
      </Link>
    </Typography>
  )
}

function Header() {
  const classes = useStyles()

  // global
  const layoutState = useLayoutState()
  const layoutDispatch = useLayoutDispatch()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Stuff and Things
        </Typography>

        <div className={classes.grow} />

        <HeaderLoginButton />
      </Toolbar>
    </AppBar>
  )
}

export default Header
