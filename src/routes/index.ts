import { Router } from 'express'
import { transactionsRoutes } from './transactions.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/users', usersRoutes)

router.use('/transactions', transactionsRoutes)
export { router }
