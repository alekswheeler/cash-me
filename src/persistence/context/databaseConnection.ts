import { DataSource } from 'typeorm'
import { join } from 'path'
import { Account } from '../../domain/models/Account'
import { Transaction } from '../../domain/models/Transaction'
import { config } from 'dotenv'
import { User } from '../../domain/models/User'

/**
 *
 * O typeorm é Object Relational Mapper (ORM) que permite que você escreva código TypeScript
 * para manipular dados em um banco de dados relacional (ou não relacional)
 *
 * Ele também é muito flexível e permite que você escreva migrations para o banco de dados,
 * além de permitir que você troque o provedor de banco de dados sem precisar alterar o código.
 *
 * Mais sobre o typeorm estará no reame do projeto.
 */

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
