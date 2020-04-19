// @flow

export default async (_, __, {session}) => {
  await new Promise(resolve => setTimeout(resolve, 500))

  return {
    email: 'yo@suh.com',
  }
}
