import {red} from '@material-ui/core/colors'
import {createMuiTheme} from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#ff4655',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ece8e1',
    },
  },
})

export default theme
