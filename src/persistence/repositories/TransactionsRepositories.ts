import { FindManyOptions, Raw, Repository } from 'typeorm'
import { ITransactionsRepositories } from '../../domain/repositories/ITransactionsRepositories'
import { Transaction } from '../../domain/models/Transaction'
import { Account } from '../../domain/models/Account'
import { User } from '../../domain/models/User'

class TransactionsRepositories implements ITransactionsRepositories {
  private repository: Repository<Transaction>

  constructor(repository: Repository<Transaction>) {
    this.repository = repository
  }

  async makeTransaction(
    from: Account,
    to: Account,
    value: number,
  ): Promise<Transaction> {
    const transaction = new Transaction(to, from, value)

    await this.repository.save(transaction)

    return transaction
  }

  async getTransactionsByUser(
    user: User,
    dateFrom?: string | undefined,
    dateTo?: string | undefined,
    type?: 'cash-in' | 'cash-out' | undefined,
  ): Promise<Transaction[]> {
    const query = []

    if (!dateFrom) {
      dateFrom = new Date('January 13, 1999 11:13:00').toLocaleDateString()
    }
    if (!dateTo) {
      dateTo = new Date().toLocaleDateString()
    }

    if (type === 'cash-in') {
      query.push({
        debitedAccount: {
          id: user.account.id,
        },
        createdAt: Raw(
          (alias) => `${alias} >= :dateFrom AND ${alias} <= :dateTo`,
          {
            dateFrom,
            dateTo,
          },
        ),
      })
    } else if (type === 'cash-out') {
      query.push({
        creditedAccount: {
          id: user.account.id,
        },
        createdAt: Raw(
          (alias) => `${alias} >= :dateFrom AND ${alias} <= :dateTo`,
          {
            dateFrom,
            dateTo,
          },
        ),
      })
    } else {
      query.push({
        creditedAccount: {
          id: user.account.id,
        },
        createdAt: Raw(
          (alias) => `${alias} >= :dateFrom AND ${alias} <= :dateTo`,
          {
            dateFrom,
            dateTo,
          },
        ),
      })
      query.push({
        debitedAccount: {
          id: user.account.id,
        },
        createdAt: Raw(
          (alias) => `${alias} >= :dateFrom AND ${alias} <= :dateTo`,
          {
            dateFrom,
            dateTo,
          },
        ),
      })
    }

    const queryParams: FindManyOptions<Transaction> = {
      where: query,
      relations: {
        debitedAccount: true,
        creditedAccount: true,
      },
    }
    return await this.repository
      .find(queryParams)
      .then((transactions) => {
        if (!transactions) {
          return []
        }
        return transactions
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
}
export { TransactionsRepositories }
