import { Router } from 'express'
import { CreateTransactionController } from '../Transactions/useCases/createTransfer/CreateTransactionController'
import { GetTransactionsController } from '../Transactions/useCases/getTransaction/GetTransactionsController'

const transactionsRoutes = Router()

const createTransactionController = new CreateTransactionController()
const getTransactionsController = new GetTransactionsController()

transactionsRoutes.post('/', createTransactionController.handle)
transactionsRoutes.get('/:username', getTransactionsController.handle)

export { transactionsRoutes }
