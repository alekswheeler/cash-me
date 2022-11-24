import { AppDataSource } from '../../dataSourceInstance'
import { Transaction } from '../../entities/Transaction'
import { TransactionsRepositories } from '../../repositories/implementations/TransactionsRepositories'
import { Request, Response } from 'express'
import { UsersRepositories } from '../../../Users/repositories/implementations/UsersRepositories'
import { User } from '../../../Users/entities/User'
import { AppError } from '../../../utils/AppError/AppError'
import { GetTransactionsUseCase } from './GetTransactionsUseCase'

interface IGetTransactions {
  dateFrom?: string
  dateTo?: string
  type?: 'cash-in' | 'cash-out'
}

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
      throw new AppError('User not found', 404)
    }

    const getTransactionsUseCase = new GetTransactionsUseCase(
      transactionsRepositories,
    )

    const { dateFrom, dateTo, type }: IGetTransactions = request.query

    const transactions = await getTransactionsUseCase.execute({
      user,
      dateFrom,
      dateTo,
      type,
    })

    return response.status(200).json(transactions)
  }
}

export { GetTransactionsController }
