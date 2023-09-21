import { Request, Response } from 'express'
import { AppError } from '../../../utils/AppError/AppError'
import { Transaction } from '../../entities/Transaction'
import { CreateTransactionUseCase } from './CreateTransactionUseCase'
import { IAccountsRepositories } from '../../../Users/repositories/IAccountsRepositories'
import { IUsersRepositories } from '../../../Users/repositories/IUsersRepositories'
import { ITransactionsRepositories } from '../../repositories/ITransactionsRepositories'

class CreateTransactionController {
  private accountsRepositories: IAccountsRepositories
  private usersRepositories: IUsersRepositories
  private transactionsRepositories: ITransactionsRepositories

  constructor(
    accountsRepositories: IAccountsRepositories,
    usersRepositories: IUsersRepositories,
    transactionsRepositories: ITransactionsRepositories,
  ) {
    this.accountsRepositories = accountsRepositories
    this.usersRepositories = usersRepositories
    this.transactionsRepositories = transactionsRepositories
  }

  async handle(request: Request, response: Response) {
    const { to, value } = request.body

    const from = request.username

    if (from === to) {
      throw new AppError('You cannot transfer to yourself', 400)
    }

    const usernameFrom = await this.usersRepositories.findByUsername(from)

    if (!usernameFrom) {
      throw new AppError('User not found', 404)
    }

    if (usernameFrom.account.balance < value) {
      throw new AppError('Insufficient funds', 400)
    }

    const usernameTo = await this.usersRepositories.findByUsername(to)

    if (!usernameTo) {
      throw new AppError('User not found', 404)
    }

    const createTransactionUseCase = new CreateTransactionUseCase(
      this.transactionsRepositories,
      this.accountsRepositories,
    )

    return await createTransactionUseCase
      .execute(usernameFrom.account, usernameTo.account, value)
      .then((transaction: Transaction) => {
        return response.status(201).json(transaction)
      })
  }
}

export { CreateTransactionController }
