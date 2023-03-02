import { Account } from '../entities/Account'

interface IAccountsRepositories {
  create(): Promise<Account>
  debit(account: Account, value: number): Promise<Account> // Realiza o débito no Account
  credit(account: Account, value: number): Promise<Account> // Realiza o crédito no Account
  getBalance(username: string): Promise<Number> // Retorna o saldo do Account
}

export { IAccountsRepositories }
