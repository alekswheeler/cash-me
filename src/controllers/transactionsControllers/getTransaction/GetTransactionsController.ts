import { Request, Response } from 'express'
import { AppError } from '../../../utils/AppError/AppError'
import { GetTransactionsUseCase } from './GetTransactionsUseCase'
import { ITransactionsRepositories } from '../../../domain/repositories/ITransactionsRepositories'
import { IUsersRepositories } from '../../../domain/repositories/IUsersRepositories'

interface IGetTransactions {
  dateFrom?: string
  dateTo?: string
  type?: 'cash-in' | 'cash-out'
}

class GetTransactionsController {
  private transactionsRepositories: ITransactionsRepositories
  private usersRepositories: IUsersRepositories

  constructor(
    transactionsRepositories: ITransactionsRepositories,
    usersRepositories: IUsersRepositories,
  ) {
    this.transactionsRepositories = transactionsRepositories
    this.usersRepositories = usersRepositories
  }

  async handle(request: Request, response: Response) {
    const username = request.username

    const user = await this.usersRepositories.findByUsername(username)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const getTransactionsUseCase = new GetTransactionsUseCase(
      this.transactionsRepositories,
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
