import { Request, Response } from 'express'
import { Account } from '../../../Users/entities/Account'
import { User } from '../../../Users/entities/User'
import { AccountsRepositories } from '../../../Users/repositories/implementations/AccountsRepositories'
import { UsersRepositories } from '../../../Users/repositories/implementations/UsersRepositories'
import { AppError } from '../../../utils/AppError/AppError'
import { AppDataSource } from '../../dataSourceInstance'
import { Transaction } from '../../entities/Transaction'
import { TransactionsRepositories } from '../../repositories/implementations/TransactionsRepositories'
import { CreateTransactionUseCase } from './CreateTransactionUseCase'

class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { to, value } = request.body

    const from = request.username

    if (from === to) {
      throw new AppError('You cannot transfer to yourself', 400)
    }

    const accountsRepositories = new AccountsRepositories(
      AppDataSource.getRepository(Account),
    )

    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )

    const usernameFrom = await usersRepositories.findByUsername(from)

    if (!usernameFrom) {
      throw new AppError('User not found', 404)
    }

    if (usernameFrom.account.balance < value) {
      throw new AppError('Insufficient funds', 400)
    }

    const usernameTo = await usersRepositories.findByUsername(to)

    if (!usernameTo) {
      throw new AppError('User not found', 404)
    }

    const transactionsRepositories = new TransactionsRepositories(
      AppDataSource.getRepository(Transaction),
    )
    const createTransactionUseCase = new CreateTransactionUseCase(
      transactionsRepositories,
      accountsRepositories,
    )

    return await createTransactionUseCase
      .execute(usernameFrom.account, usernameTo.account, value)
      .then((transaction: Transaction) => {
        return response.status(201).json(transaction)
      })
  }
}

export { CreateTransactionController }
