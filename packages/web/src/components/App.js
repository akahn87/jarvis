import React from 'react'
import {BrowserRouter} from 'react-router-dom'

// components
import Layout from './Layout'

// context
import {AuthProvider} from '../context/AuthContext'
import {UserProvider} from '../context/UserContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Layout />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
