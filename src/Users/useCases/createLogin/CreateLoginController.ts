import { Request, Response } from 'express'
import { UsersRepositories } from '../../repositories/implementations/UsersRepositories'
import { AppDataSource } from '../dataSourceInstance'
import { User } from '../../entities/User'
import { CreateLoginUseCase } from './CreateLoginUseCase'

class CreateLoginController {
  async handle(request: Request, response: Response) {
    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )
    const { username, password } = request.body

    const createLoginUseCase = new CreateLoginUseCase(usersRepositories)

    const token = await createLoginUseCase.execute({ username, password })

    return response.status(200).json({ token })
  }
}

export { CreateLoginController }
