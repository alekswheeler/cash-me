import { DataSource } from 'typeorm'
import { join } from 'path'

const createConnection = async (host: string = 'cashme_db') => {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host,
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'cashmedb',
    migrations: [join(__dirname, 'src/migrations/**/*.ts')],
  })

  AppDataSource.initialize().catch((err) => {
    console.log('unable to connect', err)
  })

  return AppDataSource
}

export { createConnection }
