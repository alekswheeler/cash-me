import { Request, Response } from 'express'
import { User } from '../../../Users/entities/User'
import { UsersRepositories } from '../../../Users/repositories/implementations/UsersRepositories'
import { AppDataSource } from '../../dataSourceInstance'
import { Transaction } from '../../entities/Transaction'
import { TransactionsRepositories } from '../../repositories/implementations/TransactionsRepositories'

class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { to, value } = request.body

    const from = request.username

    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )
    const usernameFrom = await usersRepositories.findByUsername(from)
    if (!usernameFrom) {
      return response.status(400).json({ error: 'User not found' })
    }

    const usernameTo = await usersRepositories.findByUsername(to)

    if (!usernameTo) {
      return response.status(400).json({ error: 'User not found' })
    }

    const transfersRepositories = new TransactionsRepositories(
      AppDataSource.getRepository(Transaction),
    )

    return await transfersRepositories
      .makeTransaction(usernameFrom.account, usernameTo.account, value)
      .then((transaction) => {
        return response.status(201).json(transaction)
      })
      .catch((error) => {
        console.log(error)
        return response
          .status(500)
          .json({ error: error.message, message: 'from makeT' })
      })
  }
}

export { CreateTransactionController }
