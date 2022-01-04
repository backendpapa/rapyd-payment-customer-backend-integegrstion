require('dotenv').config()

const {Pool} = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
// const connectionString = `postgres://eimzdxiadbdqse:39f8887ad47a9d5e40afff7be299d9aa2a53bfc409ece112f62f36d09da55d6d@ec2-52-5-247-46.compute-1.amazonaws.com:5432/d34jf0sahvp0ir`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: { rejectUnauthorized: false }
})

module.exports = {pool}
