import { Account } from '../entities/Account'

interface IAccountsRepositories {
  create(): Promise<Account>
  debit(account: Account, value: number): Promise<Account>
  credit(account: Account, value: number): Promise<Account>
}

export { IAccountsRepositories }
