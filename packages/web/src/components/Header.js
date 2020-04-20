import React from 'react'
import {Link} from 'react-router-dom'
import {useQuery} from '@apollo/react-hooks'

import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'

import {GET_CURRENT_USER} from '../queries'
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
  const {data} = useQuery(GET_CURRENT_USER)

  if (data && data.currentUser) {
    return (
      <Button
        onClick={() => console.log('should probably logout..')}
        color="inherit"
      >
        Logout
      </Button>
    )
  }

  return (
    <Link to="/login">
      <Button color="inherit">Login</Button>
    </Link>
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
