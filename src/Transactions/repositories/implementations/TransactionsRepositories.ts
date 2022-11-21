import { FindManyOptions, Raw, Repository } from 'typeorm'
import { Account } from '../../../Accounts/Entities/Account'
import { User } from '../../../Users/entities/User'
import { Transaction } from '../../entities/Transaction'
import { ITransactionsRepositories } from '../ITransactionsRepositories'

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
    const transaction = new Transaction(from, to, value)

    await this.repository.save(transaction)

    return transaction
  }

  async getTransactionsByUser(
    user: User,
    dateFrom?: string | undefined,
    dateTo?: string | undefined,
    type?: 'cash-in' | 'cash-out' | undefined,
  ): Promise<Transaction[]> {
    let query = {}

    if (!dateFrom) {
      dateFrom = new Date('January 13, 1999 11:13:00').toLocaleDateString()
    }
    if (!dateTo) {
      dateTo = new Date().toLocaleDateString()
    }

    if (type === 'cash-in') {
      query = {
        debitedAccount: {
          id: user.account.id,
        },
      }
    } else if (type === 'cash-out') {
      query = {
        creditedAccount: {
          id: user.account.id,
        },
      }
    }

    Object.assign(query, {
      createdAt: Raw(
        (alias) => `${alias} >= :dateFrom AND ${alias} <= :dateTo`,
        {
          dateFrom,
          dateTo,
        },
      ),
    })

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
