import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAutenticated'
import { ensureGetTransactiondata } from '../middlewares/ensureGetTransactiondata'
import { ensureMakeTransferData } from '../middlewares/ensureMakeTransferData'
import { CreateTransactionController } from '../Transactions/useCases/createTransaction/CreateTransactionController'
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
  ensureGetTransactiondata,
  getTransactionsController.handle,
)

export { transactionsRoutes }
