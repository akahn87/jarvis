import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {CURRENT_USER_QUERY} from '../queries'

const AuthContext = React.createContext()

function AuthProvider(props) {
  const {loading, error, data} = useQuery(CURRENT_USER_QUERY)

  if (loading) return <div>Loading</div>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return <AuthContext.Provider value={{data}} {...props} />
}

const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth}
