import { Request, Response } from 'express'
import { Account } from '../../../Users/entities/Account'
import { User } from '../../../Users/entities/User'
import { AccountsRepositories } from '../../../Users/repositories/implementations/AccountsRepositories'
import { UsersRepositories } from '../../../Users/repositories/implementations/UsersRepositories'
import { AppDataSource } from '../../dataSourceInstance'
import { Transaction } from '../../entities/Transaction'
import { TransactionsRepositories } from '../../repositories/implementations/TransactionsRepositories'

class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { to, value } = request.body

    const from = request.username

    if (from === to) {
      return response
        .status(400)
        .json({ message: 'You cannot transfer to yourself' })
    }

    const accountsRepositories = new AccountsRepositories(
      AppDataSource.getRepository(Account),
    )

    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )

    const usernameFrom = await usersRepositories.findByUsername(from)

    if (!usernameFrom) {
      return response.status(400).json({ error: 'User not found' })
    }

    if (usernameFrom.account.balance < value) {
      return response.status(400).json({ error: 'Insufficient funds' })
    }

    const usernameTo = await usersRepositories.findByUsername(to)

    if (!usernameTo) {
      return response.status(400).json({ error: 'User not found' })
    }

    const transfersRepositories = new TransactionsRepositories(
      AppDataSource.getRepository(Transaction),
    )

    try {
      await accountsRepositories.debit(usernameFrom.account, value)
      await accountsRepositories.credit(usernameTo.account, value)
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }

    return await transfersRepositories
      .makeTransaction(usernameFrom.account, usernameTo.account, value)
      .then((transaction) => {
        return response.status(201).json(transaction)
      })
      .catch((error) => {
        console.log(error)
        return response.status(500).json({ error: error.message })
      })
  }
}

export { CreateTransactionController }
