import { createConnection } from './databaseConnection'

const AppDataSource = createConnection('localhost')

export { AppDataSource }
