import { Repository } from 'typeorm'
import { Account } from '../../entities/Account'
import { IAccountsRepositories } from '../IAccountsRepositories'

class AccountsRepositories implements IAccountsRepositories {
  private repository: Repository<Account>

  constructor(repository: Repository<Account>) {
    this.repository = repository
  }

  async debit(account: Account, value: number): Promise<Account> {
    if (account.balance < value) {
      throw new Error('Insufficient funds')
    }
    const newValue = Number(account.balance) - Number(value)
    account.balance = newValue

    return await this.repository.save(account)
  }

  async credit(account: Account, value: number): Promise<Account> {
    const newValue = Number(account.balance) + Number(value)

    account.balance = newValue

    return await this.repository.save(account)
  }

  async create(): Promise<Account> {
    const account = new Account()
    return this.repository.save(account)
  }
}

export { AccountsRepositories }
