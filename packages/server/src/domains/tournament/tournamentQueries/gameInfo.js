export default async (parent, _, {loaders}) => {
  return loaders.gameInfo.load(`?name=${parent.game_name}`)
}
