import { DataSource } from 'typeorm'
import { join } from 'path'
import { Account } from './Accounts/Entities/Account'
import { User } from './Users/entities/User'

const createConnection = (host: string = 'cashme_db') => {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host,
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'cashmedb',
    entities: [Account, User],
    migrations: [join(__dirname, 'migrations/**/*.ts')],
  })

  AppDataSource.initialize().catch((err) => {
    console.log('unable to connect', err)
  })

  return AppDataSource
}

export { createConnection }
