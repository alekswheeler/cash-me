import { Account } from '../../domain/models/Account'
import { Transaction } from '../../domain/models/Transaction'
import { User } from '../models/User'

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
