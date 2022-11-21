import { Router } from 'express'
import { verifyUserData } from '../middlewares/verifyUserData'
import { CreateUserController } from '../Users/useCases/createUser/CreateUserController'

const createUserController = new CreateUserController()

const usersRoutes = Router()

usersRoutes.post('/', verifyUserData, createUserController.handle)

export { usersRoutes }
