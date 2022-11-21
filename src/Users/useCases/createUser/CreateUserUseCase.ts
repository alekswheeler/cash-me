import { ICreateUserDTO } from '../../dtos/CreateUserDTO'
import { User } from '../../entities/User'
import { IAccountsRepositories } from '../../repositories/IAccountsRepositories'
import { IUsersRepositories } from '../../repositories/IUsersRepositories'

class CreateUserUseCase {
  private usersRepositories: IUsersRepositories
  private accountsRepositories: IAccountsRepositories

  constructor(
    usersRepositories: IUsersRepositories,
    accountsRepositories: IAccountsRepositories,
  ) {
    this.usersRepositories = usersRepositories
    this.accountsRepositories = accountsRepositories
  }

  async execute({ username, password }: ICreateUserDTO) {
    const account = await this.accountsRepositories.create()
    const user = new User(username, password, account)

    return await this.usersRepositories.save(user).then((user) => {
      return user
    })
  }
}

export { CreateUserUseCase }
