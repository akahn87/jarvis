import fetch from 'node-fetch'

export default async (_, {query}) => {
  const response = await fetch(
    `https://api.twitch.tv/helix/search/streams?query=${query}`,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
      },
    },
  ).then(res => res.json())

  console.log(response)

  return response.data
}
