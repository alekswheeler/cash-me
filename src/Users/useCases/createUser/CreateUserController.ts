import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { InMemoryAccountsRepositories } from '../../repositories/implementations/inMemoryAccountsRepositories'
import { InMemoryUsersRepositories } from '../../repositories/implementations/InMemoryUsersRepositories'
class CreateUserController {
  async handle(request: Request, response: Response) {
    const usersRepositories = new InMemoryUsersRepositories()

    const accountsRepositories = new InMemoryAccountsRepositories()

    const { username, password } = request.body

    const createUserUseCase = new CreateUserUseCase(
      usersRepositories,
      accountsRepositories,
    )

    return await createUserUseCase
      .execute({
        username,
        password,
      })
      .then((user) => {
        return response.status(201).json(user)
      })
  }
}

export { CreateUserController }
