import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import { config } from 'dotenv'
import { UsersRepositories } from '../../repositories/implementations/UsersRepositories'
import { AppDataSource } from '../dataSourceInstance'
import { User } from '../../entities/User'
import * as JWT from 'jsonwebtoken'

class CreateLoginController {
  async handle(request: Request, response: Response) {
    config()

    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )
    const { username, password } = request.body
    const user = await usersRepositories.findByUsername(username)

    if (!user) {
      return response
        .status(400)
        .json({ error: 'incorrect username or password' })
    }

    let token: string
    try {
      token = JWT.sign(
        { username: user.username },
        process.env.SECRET as string,
        {
          expiresIn: '24h',
          algorithm: 'HS256',
        },
      )
    } catch (err) {
      console.log(err)
      return response.status(500).json({ error: 'internal server error' })
    }

    await bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        return response.status(200).json({ token })
      }
      return response
        .status(400)
        .json({ error: 'incorrect username or password' })
    })
  }
}

export { CreateLoginController }
