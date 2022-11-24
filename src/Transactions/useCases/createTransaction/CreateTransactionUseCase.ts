import { Account } from '../../../Users/entities/Account'
import { IAccountsRepositories } from '../../../Users/repositories/IAccountsRepositories'
import { Transaction } from '../../entities/Transaction'
import { ITransactionsRepositories } from '../../repositories/ITransactionsRepositories'

class CreateTransactionUseCase {
  private readonly transactionsRepositories: ITransactionsRepositories
  private readonly accountsRepositories: IAccountsRepositories

  constructor(
    transactionsRepositories: ITransactionsRepositories,
    accountsRepositories: IAccountsRepositories,
  ) {
    this.transactionsRepositories = transactionsRepositories
    this.accountsRepositories = accountsRepositories
  }

  async execute(
    from: Account,
    to: Account,
    value: number,
  ): Promise<Transaction> {
    await this.accountsRepositories.debit(to, value)
    await this.accountsRepositories.credit(from, value)

    return await this.transactionsRepositories.makeTransaction(from, to, value)
  }
}

export { CreateTransactionUseCase }
