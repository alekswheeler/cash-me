import { AppDataSource } from '../../dataSourceInstance'
import { Transaction } from '../../entities/Transaction'
import { TransactionsRepositories } from '../../repositories/implementations/TransactionsRepositories'
import { Request, Response } from 'express'
import { UsersRepositories } from '../../../Users/repositories/implementations/UsersRepositories'
import { User } from '../../../Users/entities/User'

class GetTransactionsController {
  async handle(request: Request, response: Response) {
    const transactionsRepositories = new TransactionsRepositories(
      AppDataSource.getRepository(Transaction),
    )

    const username = request.username

    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )
    const user = await usersRepositories.findByUsername(username)

    if (!user) {
      return response.status(400).json({ error: 'User not found' })
    }

    const { dateFrom, dateTo, type } = request.query

    return await transactionsRepositories
      .getTransactionsByUser(
        user,
        dateFrom as string,
        dateTo as string,
        type as 'cash-in' | 'cash-out',
      )
      .then((transactions) => {
        return response.status(200).json(transactions)
      })
      .catch((error) => {
        console.log(error)
        return response.status(500).json({ error: error.message })
      })
  }
}

export { GetTransactionsController }
