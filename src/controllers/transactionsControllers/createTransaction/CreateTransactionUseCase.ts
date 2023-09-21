import { Account } from '../../../domain/models/Account'
import { IAccountsRepositories } from '../../../domain/repositories/IAccountsRepositories'
import { Transaction } from '../../../domain/models/Transaction'
import { ITransactionsRepositories } from '../../../domain/repositories/ITransactionsRepositories'

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
    await this.accountsRepositories.debit(from, value)
    await this.accountsRepositories.credit(to, value)

    return await this.transactionsRepositories.makeTransaction(from, to, value)
  }
}

export { CreateTransactionUseCase }
