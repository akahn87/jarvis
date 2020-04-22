import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import App from './components/App'
import theme from './theme'

import {LayoutProvider} from './context/LayoutContext'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <LayoutProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </LayoutProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
