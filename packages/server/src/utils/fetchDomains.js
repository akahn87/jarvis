import {readdirSync, statSync} from 'fs'
import {join} from 'path'
import merge from 'lodash/merge'
import {makeExecutableSchema} from 'graphql-tools'
import DataLoader from 'dataloader'

function rebuildLoaders(rawLoader, request) {
  const result = {}

  Object.keys(rawLoader).forEach(loaderType => {
    result[loaderType] = new DataLoader(keys => {
      return rawLoader[loaderType](request, keys)
    })
  })

  return result
}

// really, this should be async.
function directoriesInPathSync(path) {
  const childrenNames = readdirSync(path)
  const fullPaths = childrenNames.map(childName => join(path, childName))

  const dirNames = fullPaths.filter(childName => {
    const stat = statSync(childName)

    return stat.isDirectory()
  })

  return dirNames
}

/*
 * Find all domain directories in the specified paths.  For each, read in its
 * typeDefs, resolvers and loaders and assemble into a package that can be used
 */
async function gatherDomains(paths) {
  const results = {}
  const allSchemas = []
  const allResolvers = []
  let allRawLoaders = []
  let promises = []
  paths.flatMap(async path => {
    const subdirectories = directoriesInPathSync(path)

    promises = [
      ...promises,
      ...subdirectories.map(async subPath => {
        const module = await import(subPath)

        // We assume there is no default property (or if there is, we just ignore it)
        if (module.types) {
          allSchemas.push(module.types)
        }

        if (module.resolvers) {
          allResolvers.push(module.resolvers)
        }

        if (module.loaders) {
          allRawLoaders = {
            ...allRawLoaders,
            ...module.loaders,
          }
        }
      }),
    ]
  })

  await Promise.all(promises)

  results.schema = makeExecutableSchema({
    typeDefs: allSchemas,
    resolvers: merge({}, ...allResolvers),
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  })

  results.rawLoaders = allRawLoaders

  return results
}

export {rebuildLoaders, gatherDomains}
