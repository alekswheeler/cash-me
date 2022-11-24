import { Request, Response } from 'express'
import { Account } from '../../entities/Account'
import { AccountsRepositories } from '../../repositories/implementations/AccountsRepositories'
import { User } from '../../entities/User'
import { UsersRepositories } from '../../repositories/implementations/UsersRepositories'
import { AppDataSource } from '../dataSourceInstance'
import * as bcrypt from 'bcrypt'
import { CreateUserUseCase } from './CreateUserUseCase'
import { AppError } from '../../../utils/AppError/AppError'
class CreateUserController {
  async handle(request: Request, response: Response) {
    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )

    const accountsRepositories = new AccountsRepositories(
      AppDataSource.getRepository(Account),
    )

    const { username, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt
      .hash(password, saltRounds)
      .then(function (hash) {
        return hash
      })

    if (!passwordHash) {
      throw new AppError('Error while hashing password', 500)
    }

    const createUserUseCase = new CreateUserUseCase(
      usersRepositories,
      accountsRepositories,
    )

    return await createUserUseCase
      .execute({
        username,
        password: passwordHash,
      })
      .then((user) => {
        return response.status(201).json(user)
      })
  }
}

export { CreateUserController }
