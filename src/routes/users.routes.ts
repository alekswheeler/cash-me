import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAutenticated'
import { verifyUserData } from '../middlewares/verifyUserData'
import { CreateLoginController } from '../Users/useCases/createLogin/CreateLoginController'
import { CreateUserController } from '../Users/useCases/createUser/CreateUserController'
import { GetBallanceController } from '../Users/useCases/getBalance/GetBalanceController'

const createUserController = new CreateUserController()
const createLoginController = new CreateLoginController()
const getBalanceController = new GetBallanceController()
const usersRoutes = Router()

usersRoutes.post('/', verifyUserData, createUserController.handle)
usersRoutes.post('/login', createLoginController.handle)
usersRoutes.get('/balance', ensureAuthenticated, getBalanceController.handle)

export { usersRoutes }
