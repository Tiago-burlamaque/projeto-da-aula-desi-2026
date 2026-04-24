import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql2.createPool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || 'fultast',
    host: process.env.DB_HOST
})

export default db;