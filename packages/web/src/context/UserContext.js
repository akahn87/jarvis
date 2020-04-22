import React from 'react'
import {useAuth} from './AuthContext'

const UserContext = React.createContext()

const UserProvider = props => {
  const {data} = useAuth()

  return (
    <UserContext.Provider
      value={data ? data.currentUser || {} : {}}
      {...props}
    />
  )
}

const useUser = () => React.useContext(UserContext)

export {UserProvider, useUser}
