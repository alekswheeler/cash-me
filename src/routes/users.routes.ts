import { Request, Response, Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAutenticated'
import { verifyUserData } from '../middlewares/verifyUserData'
import { CreateLoginController } from '../Users/useCases/createLogin/CreateLoginController'
import { CreateUserController } from '../Users/useCases/createUser/CreateUserController'
import { GetBallanceController } from '../Users/useCases/getBalance/GetBalanceController'
import { UsersRepositories } from '../Users/repositories/implementations/UsersRepositories'
import { User } from '../Users/entities/User'
import { createConnection } from '../databaseConnection'
import { Account } from '../Users/entities/Account'
import { AccountsRepositories } from '../Users/repositories/implementations/AccountsRepositories'

const usersRepositories = new UsersRepositories(
  createConnection().getRepository(User),
)
const accountsRepositories = new AccountsRepositories(
  createConnection().getRepository(Account),
)

const createUserController = new CreateUserController(
  usersRepositories,
  accountsRepositories,
)
const createLoginController = new CreateLoginController(usersRepositories)
const getBalanceController = new GetBallanceController(usersRepositories)

const usersRoutes = Router()

// Este trecho é responsável por atrelar os middlewares de verificação de dados e de autenticação
// E também por chamar os controllers responsáveis por cada rota.
usersRoutes.post('/', verifyUserData, (req: Request, res: Response) => {
  return createUserController.handle(req, res)
})
usersRoutes.post('/login', (req: Request, res: Response) => {
  return createLoginController.handle(req, res)
})
usersRoutes.get(
  '/balance',
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return getBalanceController.handle(req, res)
  },
)

export { usersRoutes }
