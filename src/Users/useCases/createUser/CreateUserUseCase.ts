import { User } from '../../entities/User'
import { IAccountsRepositories } from '../../repositories/IAccountsRepositories'
import { IUsersRepositories } from '../../repositories/IUsersRepositories'
import * as bcrypt from 'bcrypt'

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

  async execute({
    username,
    password,
  }: {
    username: string
    password: string
  }) {
    const userAlreadyExists = await this.usersRepositories.findByUsername(
      username,
    )

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt
      .hash(password, saltRounds)
      .then(function (hash) {
        return hash
      })

    if (!passwordHash) {
      throw new Error('Error on password')
    }

    const account = await this.accountsRepositories.create()
    const user = new User(username, passwordHash, account)

    return await this.usersRepositories.save(user).then((user) => {
      return user
    })
  }
}

export { CreateUserUseCase }
