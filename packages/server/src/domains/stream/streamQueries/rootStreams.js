import fetch from 'node-fetch'

export default async () => {
  const response = await fetch(
    `https://api.twitch.tv/helix/streams?game_id=33214&language=en&limit=10`,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
      },
    },
  ).then(res => res.json())

  return response.data
}
