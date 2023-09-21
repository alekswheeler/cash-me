import { Request, Response, Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAutenticated'
import { ensureGetTransactiondata } from '../middlewares/ensureGetTransactiondata'
import { ensureMakeTransferData } from '../middlewares/ensureMakeTransferData'
import { CreateTransactionController } from '../Transactions/useCases/createTransaction/CreateTransactionController'
import { GetTransactionsController } from '../Transactions/useCases/getTransaction/GetTransactionsController'
import { UsersRepositories } from '../Users/repositories/implementations/UsersRepositories'
import { AccountsRepositories } from '../Users/repositories/implementations/AccountsRepositories'
import { createConnection } from '../databaseConnection'
import { TransactionsRepositories } from '../Transactions/repositories/implementations/TransactionsRepositories'
import { User } from '../Users/entities/User'
import { Account } from '../Users/entities/Account'
import { Transaction } from '../Transactions/entities/Transaction'

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
