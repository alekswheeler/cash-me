import { Request, Response, Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAutenticated'
import { verifyUserData } from '../middlewares/verifyUserData'
import { CreateLoginController } from '../controllers/usersControllers/createLogin/CreateLoginController'
import { CreateUserController } from '../controllers/usersControllers/createUser/CreateUserController'
import { GetBallanceController } from '../controllers/usersControllers/getBalance/GetBalanceController'
import { createConnection } from '../persistence/context/databaseConnection'
import { Account } from '../domain/models/Account'
import { AccountsRepositories } from '../persistence/repositories/AccountsRepositories'
import { UsersRepositories } from '../persistence/repositories/UsersRepositories'
import { User } from '../domain/models/User'

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
