import fetch from 'node-fetch'
import orderBy from 'lodash/orderBy'

export default async () => {
  const response = await fetch(
    `https://${process.env.CHALLONGE_CLIENT_ID}:${process.env.CHALLONGE_API_KEY}@api.challonge.com/v1/tournaments.json`,
  ).then(res => res.json())

  const data = response.map(items => items.tournament)
  return orderBy(data, ['created_at'], ['desc'])
}
