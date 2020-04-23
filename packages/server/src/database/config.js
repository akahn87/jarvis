require('dotenv-safe').config()

const {DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD} = process.env

const config = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
}

export default config
