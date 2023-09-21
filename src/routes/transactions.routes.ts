import { Request, Response, Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAutenticated'
import { ensureGetTransactiondata } from '../middlewares/ensureGetTransactiondata'
import { ensureMakeTransferData } from '../middlewares/ensureMakeTransferData'
import { CreateTransactionController } from '../controllers/transactionsControllers/createTransaction/CreateTransactionController'
import { GetTransactionsController } from '../controllers/transactionsControllers/getTransaction/GetTransactionsController'
import { AccountsRepositories } from '../persistence/repositories/AccountsRepositories'
import { createConnection } from '../persistence/context/databaseConnection'
import { Account } from '../domain/models/Account'
import { Transaction } from '../domain/models/Transaction'
import { UsersRepositories } from '../persistence/repositories/UsersRepositories'
import { User } from '../domain/models/User'
import { TransactionsRepositories } from '../persistence/repositories/TransactionsRepositories'

const transactionsRoutes = Router()

const usersRepositories = new UsersRepositories(
  createConnection().getRepository(User),
)
const accountsRepositories = new AccountsRepositories(
  createConnection().getRepository(Account),
)
const transactionsRepositories = new TransactionsRepositories(
  createConnection().getRepository(Transaction),
)

const createTransactionController = new CreateTransactionController(
  accountsRepositories,
  usersRepositories,
  transactionsRepositories,
)
const getTransactionsController = new GetTransactionsController(
  transactionsRepositories,
  usersRepositories,
)

transactionsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureMakeTransferData,
  (request: Request, response: Response) => {
    return createTransactionController.handle(request, response)
  },
)

transactionsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureGetTransactiondata,
  (request: Request, response: Response) => {
    return getTransactionsController.handle(request, response)
  },
)

export { transactionsRoutes }
