import { Repository } from 'typeorm'
import { Account } from '../../Entities/Account'
import { IAccountsRepositories } from '../IAccountsRepositories'

class AccountsRepositories implements IAccountsRepositories {
  private repository: Repository<Account>

  constructor(repository: Repository<Account>) {
    this.repository = repository
  }

  async create(): Promise<Account> {
    const account = new Account()
    return this.repository.save(account)
  }
}

export { AccountsRepositories }
