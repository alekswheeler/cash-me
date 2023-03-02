import { Account } from '../../entities/Account'
import { IAccountsRepositories } from '../IAccountsRepositories'

class InMemoryAccountsRepositories implements IAccountsRepositories {
  getBalance(username: string): Promise<Number> {
    throw new Error('Method not implemented.')
  }

  private accounts: Account[] = []

  async create(): Promise<Account> {
    const account = new Account()

    this.accounts.push(account)
    return account
  }

  async debit(account: Account, value: number): Promise<Account> {
    throw new Error('Method not implemented.')
  }

  async credit(account: Account, value: number): Promise<Account> {
    throw new Error('Method not implemented.')
  }
}

export { InMemoryAccountsRepositories }
