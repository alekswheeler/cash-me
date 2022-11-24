import { DataSource } from 'typeorm'
import { join } from 'path'
import { Account } from './Users/entities/Account'
import { User } from './Users/entities/User'
import { Transaction } from './Transactions/entities/Transaction'
import { config } from 'dotenv'

const createConnection = (host: string = 'cashme_db') => {
  config()
  const AppDataSource = new DataSource({
    type: 'postgres',
    host,
    port: 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: [Account, User, Transaction],
    migrations: [join(__dirname, 'migrations/**/*.ts')],
  })

  AppDataSource.initialize().catch((err) => {
    console.log('unable to connect', err)
  })

  return AppDataSource
}

export { createConnection }
