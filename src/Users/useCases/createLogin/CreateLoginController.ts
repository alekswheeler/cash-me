import { Request, Response } from 'express'
import { CreateLoginUseCase } from './CreateLoginUseCase'
import { IUsersRepositories } from '../../repositories/IUsersRepositories'

class CreateLoginController {
  private usersRepositories: IUsersRepositories

  constructor(usersRepositories: IUsersRepositories) {
    this.usersRepositories = usersRepositories
  }

  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const createLoginUseCase = new CreateLoginUseCase(this.usersRepositories)

    const token = await createLoginUseCase.execute({ username, password })

    return response.status(200).json({ token })
  }
}

export { CreateLoginController }
