import { Request, Response } from 'express'
import { User } from '../../entities/User'
import { UsersRepositories } from '../../repositories/implementations/UsersRepositories'
import { AppDataSource } from '../dataSourceInstance'
import { GetBalanceUseCase } from './GetBalanceUseCase'
class GetBallanceController {
  async handle(request: Request, response: Response) {
    const username = request.username

    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )

    const getBalanceUseCase = new GetBalanceUseCase(usersRepositories)

    const balance = await getBalanceUseCase.execute(username)

    return response.status(200).json({ balance })
  }
}

export { GetBallanceController }
