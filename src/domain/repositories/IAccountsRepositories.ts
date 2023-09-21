import { Account } from '../models/Account'

interface IAccountsRepositories {
  create(): Promise<Account>
  debit(account: Account, value: number): Promise<Account>
  credit(account: Account, value: number): Promise<Account>
  getBalance(username: string): Promise<Number>
}

export { IAccountsRepositories }
