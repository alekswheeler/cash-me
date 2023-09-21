/**
 * As migrations são responsáveis por fazer mudanças no banco de dados e matém o histórico de alterações.
 * Fazendo com que o banco de dados possa ser facilmente atualizado sem ter disparidadades entre os ambientes de desenvolvimento e produção.
 *
 */

import { createConnection } from './databaseConnection'

const AppDataSource = createConnection('localhost')

export { AppDataSource }
