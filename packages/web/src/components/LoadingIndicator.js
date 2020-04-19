import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20em',
  },
}))

function LoadingIndicator() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  )
}

export default LoadingIndicator
