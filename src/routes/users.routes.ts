import { Router } from 'express'
import { verifyUserData } from '../middlewares/verifyUserData'
import { CreateLoginController } from '../Users/useCases/createLogin/CreateLoginController'
import { CreateUserController } from '../Users/useCases/createUser/CreateUserController'

const createUserController = new CreateUserController()
const createLoginController = new CreateLoginController()
const usersRoutes = Router()

usersRoutes.post('/', verifyUserData, createUserController.handle)
usersRoutes.post('/login', createLoginController.handle)

export { usersRoutes }
