import { AppError } from '../../../utils/AppError/AppError'
import { ICreateUserDTO } from '../../../domain/models/CreateUserDTO'
import { IAccountsRepositories } from '../../../domain/repositories/IAccountsRepositories'
import * as bcrypt from 'bcrypt'
import { IUsersRepositories } from '../../../domain/repositories/IUsersRepositories'
import { User } from '../../../domain/models/User'

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
    const userAlreadyExists = await this.usersRepositories.findByUsername(
      username,
    )

    if (userAlreadyExists) {
      throw new AppError('User already exists', 400)
    }

    const saltRounds = 10
    const passwordHash = await bcrypt
      .hash(password, saltRounds)
      .then(function (hash) {
        return hash
      })

    if (!passwordHash) {
      throw new AppError('Error while hashing password', 500)
    }

    const account = await this.accountsRepositories.create()
    const user = new User(username, passwordHash, account)

    return await this.usersRepositories.save(user).then((user) => {
      return user
    })
  }
}

export { CreateUserUseCase }
