import { Request, Response } from 'express'
import { GetBalanceUseCase } from './GetBalanceUseCase'
import { IUsersRepositories } from '../../repositories/IUsersRepositories'
class GetBallanceController {
  private usersRepositories: IUsersRepositories

  constructor(usersRepositories: IUsersRepositories) {
    this.usersRepositories = usersRepositories
  }

  async handle(request: Request, response: Response) {
    const username = request.username

    const getBalanceUseCase = new GetBalanceUseCase(this.usersRepositories)

    const balance = await getBalanceUseCase.execute(username)

    return response.status(200).json({ balance })
  }
}

export { GetBallanceController }
