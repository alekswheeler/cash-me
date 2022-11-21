import { Account } from '../entities/Account'

interface IAccountsRepositories {
  create(): Promise<Account>
}

export { IAccountsRepositories }
