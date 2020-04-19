import {GoogleSpreadsheet} from 'google-spreadsheet'
import isEmpty from 'lodash/isEmpty'

export default async (
  _,
  {sheetId = '1Zx_yagUB1rSIQgjSY9GYtqypGSFWLcQoOLchsnevAGM'},
) => {
  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(sheetId)

  // OR load directly from json file if not in secure environment
  await doc.useServiceAccountAuth(require('../../../../oauth2.keys.json'))
  await doc.loadInfo() // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows() // can pass in { limit, offset }

  const dataTransform = rows
    .filter(row => !isEmpty(row['Team Name']))
    .map(row => {
      return {
        timestamp: row.Timestamp,
        team_name: row['Team Name'],
        captain: {
          discord_name: row['Team Captain - Discord Name'],
          username: row['Team Captain - Epic Name'],
        },
        players: [
          {
            discord_name: row['Player 2 - Discord Name'],
            username: row['Player 2 - Epic Name'],
          },
          {
            discord_name: row['Player 3 - Discord Name'],
            username: row['Player 3 - Epic Name'],
          },
          {
            discord_name: row['Player 4 - Discord Name'],
            username: row['Player 4 - Epic Name'],
          },
        ],
        substitutes: [
          {
            discord_name: row['Player 5 - Discord Name'],
            username: row['Player 5 - Epic Name'],
          },
        ],
      }
    })

  return dataTransform
}
