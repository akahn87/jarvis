import fetch from 'node-fetch'

export default async (_, {id}) => {
  const response = await fetch(
    `https://${process.env.CHALLONGE_CLIENT_ID}:${process.env.CHALLONGE_API_KEY}@api.challonge.com/v1/tournaments/${id}.json`,
  ).then(res => res.json())

  return response.tournament
}
