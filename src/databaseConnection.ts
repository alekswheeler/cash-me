import { DataSource } from 'typeorm'
import { join } from 'path'
import { Account } from './Accounts/Entities/Account'

const createConnection = (host: string = 'cashme_db') => {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host,
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'cashmedb',
    entities: [Account],
    migrations: [join(__dirname, 'migrations/**/*.ts')],
  })

  AppDataSource.initialize().catch((err) => {
    console.log('unable to connect', err)
  })

  return AppDataSource
}

export { createConnection }
