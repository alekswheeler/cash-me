import { IUsersRepositories } from '../../repositories/IUsersRepositories'
import * as JWT from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { AppError } from '../../../utils/AppError/AppError'
import { ICreateUserDTO } from '../../dtos/CreateUserDTO'
import { config } from 'dotenv'

class CreateLoginUseCase {
  private readonly usersRepositories: IUsersRepositories

  constructor(usersRepositories: IUsersRepositories) {
    this.usersRepositories = usersRepositories
  }

  async execute({ username, password }: ICreateUserDTO): Promise<string> {
    config()

    const user = await this.usersRepositories.findByUsername(username)
    if (!user) {
      throw new AppError('Username or password incorrect', 400)
    }

    const token = JWT.sign(
      { username: user.username },
      process.env.SECRET as string,
      {
        expiresIn: '24h',
        algorithm: 'HS256',
      },
    )

    const verify = await bcrypt.compare(password, user.password)

    if (!verify) {
      throw new AppError('Username or password incorrect', 400)
    }

    return token
  }
}

export { CreateLoginUseCase }
