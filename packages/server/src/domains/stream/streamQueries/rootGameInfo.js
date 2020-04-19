export default async (_, {id, name}, {loaders}) => {
  const query = id ? `?id=${id}` : `?name=${name}`
  return loaders.gameInfo.load(query)
}
