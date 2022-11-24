import { Request, Response } from 'express'
import { Account } from '../../entities/Account'
import { AccountsRepositories } from '../../repositories/implementations/AccountsRepositories'
import { User } from '../../entities/User'
import { UsersRepositories } from '../../repositories/implementations/UsersRepositories'
import { AppDataSource } from '../dataSourceInstance'
import { CreateUserUseCase } from './CreateUserUseCase'
class CreateUserController {
  async handle(request: Request, response: Response) {
    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )

    const accountsRepositories = new AccountsRepositories(
      AppDataSource.getRepository(Account),
    )

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
