import fetch from 'node-fetch'
import replace from 'lodash/replace'

async function gameInfoLoader(_, queries) {
  const games = await Promise.all(
    queries.map(async query => {
      const response = await fetch(
        `https://api.twitch.tv/helix/games${query}`,
        {
          headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
          },
        },
      ).then(res => res.json())

      const gameInfo = response.data[0]
      if (gameInfo && gameInfo.box_art_url) {
        gameInfo.box_art_url = replace(gameInfo.box_art_url, '{width}', '144')
        gameInfo.box_art_url = replace(gameInfo.box_art_url, '{height}', '192')
      }

      return gameInfo
    }),
  )

  return games
}

const streamLoaders = {
  gameInfo: gameInfoLoader,
}

export default streamLoaders
