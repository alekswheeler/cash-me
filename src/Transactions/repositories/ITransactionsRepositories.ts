import { Account } from '../../Users/entities/Account'
import { User } from '../../Users/entities/User'
import { Transaction } from '../entities/Transaction'

interface ITransactionsRepositories {
  makeTransaction(
    from: Account,
    to: Account,
    value: number,
  ): Promise<Transaction>
  getTransactionsByUser(
    user: User,
    dateFrom?: string,
    dateTo?: string,
    type?: 'cash-in' | 'cash-out',
  ): Promise<Transaction[]>
}

export { ITransactionsRepositories }
