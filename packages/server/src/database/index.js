import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require('./db.config.json')[env]

const models = {}

const {DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD} = process.env

const sequelize = new Sequelize(
  DATABASE,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
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
