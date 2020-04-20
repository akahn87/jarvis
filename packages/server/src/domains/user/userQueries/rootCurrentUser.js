// @flow

const getUserById = async user => {
  if (user.id === '101794521951531008') {
    user.role = 'ADMIN'
  } else {
    user.role = 'USER'
  }

  return user
}

export default async (_, __, {user}) => {
  if (!user || !user.id) return null

  const dbUser = await getUserById(user)

  return dbUser
}
