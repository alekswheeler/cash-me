import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import { config } from 'dotenv'
import { UsersRepositories } from '../../repositories/implementations/UsersRepositories'
import { AppDataSource } from '../dataSourceInstance'
import { User } from '../../entities/User'
import * as JWT from 'jsonwebtoken'
import { AppError } from '../../../utils/AppError/AppError'

class CreateLoginController {
  async handle(request: Request, response: Response) {
    config()

    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )
    const { username, password } = request.body
    const user = await usersRepositories.findByUsername(username)

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

    await bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        return response.status(200).json({ token })
      }
      throw new AppError('Username or password incorrect', 400)
    })
  }
}

export { CreateLoginController }
