import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import envConfigs from './config'

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = envConfigs[env]

const models = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
)

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, '/models', file))

    models[model.name] = model
  })

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

export {sequelize}
export default models
