import {makeStyles} from '@material-ui/styles'

export default makeStyles(theme => ({
  hero: {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundBlendMode: 'multiply',
  },
  shadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  header: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    height: '330px',
    padding: '2.5rem 2.5rem',
  },
}))
