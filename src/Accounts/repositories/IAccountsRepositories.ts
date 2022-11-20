import { Account } from '../Entities/Account'

interface IAccountsRepositories {
  create(): Promise<Account>
}

export { IAccountsRepositories }
