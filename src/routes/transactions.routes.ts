import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAutenticated'
import { ensureMakeTransferData } from '../middlewares/ensureMakeTransferData'
import { CreateTransactionController } from '../Transactions/useCases/createTransfer/CreateTransactionController'
import { GetTransactionsController } from '../Transactions/useCases/getTransaction/GetTransactionsController'

const transactionsRoutes = Router()

const createTransactionController = new CreateTransactionController()
const getTransactionsController = new GetTransactionsController()

transactionsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureMakeTransferData,
  createTransactionController.handle,
)
transactionsRoutes.get(
  '/',
  ensureAuthenticated,
  getTransactionsController.handle,
)

export { transactionsRoutes }
