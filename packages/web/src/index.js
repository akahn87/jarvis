import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import App from './containers/App'
import theme from './theme'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <CssBaseline />
      <App />
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root'),
)
