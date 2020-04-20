import React from 'react'
import {Link} from 'react-router-dom'
import {useQuery} from '@apollo/react-hooks'

import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'

import {CURRENT_USER_QUERY} from '../queries'
import {Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  )
}

const HeaderLoginButton = ({currentUser}) => {
  const {loading, error, data} = useQuery(CURRENT_USER_QUERY)
  if (loading) return <div>Loading</div>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  const isLoggedIn = !!data.currentUser

  if (isLoggedIn) {
    const {username} = data.currentUser

    return (
      <>
        <Typography>Hi, {username}</Typography>
        <Button
          onClick={() => console.log('should probably logout..')}
          color="white"
        >
          Logout
        </Button>
      </>
    )
  }

  return (
    <a href="http://localhost:4000/auth/discord">
      <Button color="white">Login</Button>
    </a>
  )
}

function Header() {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.title}>
          <Link to="/">
            <IconButton>
              <HomeIcon style={{color: 'white'}} fontSize="large" />
            </IconButton>
          </Link>
        </div>
        <HeaderLoginButton />
      </Toolbar>
    </AppBar>
  )
}

export default Header
