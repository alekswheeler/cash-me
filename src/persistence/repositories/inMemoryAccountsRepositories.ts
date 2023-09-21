import { Account } from '../../domain/models/Account'
import { IAccountsRepositories } from '../../domain/repositories/IAccountsRepositories'
import { AppError } from '../../utils/AppError/AppError'

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
    const accountIndex = this.accounts.findIndex(
      (findAccount) => findAccount.id === account.id,
    )

    if (accountIndex === -1) {
      throw new AppError('Account not found')
    }

    if (value > this.accounts[accountIndex].balance) {
      throw new AppError('Insufficient funds')
    }

    const newValue = Number(this.accounts[accountIndex].balance) - Number(value)

    this.accounts[accountIndex].balance = newValue

    return this.accounts[accountIndex]
  }

  async credit(account: Account, value: number): Promise<Account> {
    const accountIndex = this.accounts.findIndex(
      (findAccount) => findAccount.id === account.id,
    )

    if (accountIndex === -1) {
      throw new AppError('Account not found')
    }

    const newValue = Number(this.accounts[accountIndex].balance) + Number(value)

    this.accounts[accountIndex].balance = newValue

    return this.accounts[accountIndex]
  }
}

export { InMemoryAccountsRepositories }
