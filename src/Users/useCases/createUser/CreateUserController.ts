import { Request, Response } from 'express'
import { Account } from '../../entities/Account'
import { AccountsRepositories } from '../../repositories/implementations/AccountsRepositories'
import { User } from '../../entities/User'
import { UsersRepositories } from '../../repositories/implementations/UsersRepositories'
import { AppDataSource } from '../dataSourceInstance'
import * as bcrypt from 'bcrypt'
import { CreateUserUseCase } from './CreateUserUseCase'
class CreateUserController {
  async handle(request: Request, response: Response) {
    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )

    const { username, password } = request.body

    const userAlreadyExists = await usersRepositories.findByUsername(username)

    if (userAlreadyExists) {
      return response
        .status(409)
        .json({ message: 'user already exists' })
        .send()
    }
    const accountsRepositories = new AccountsRepositories(
      AppDataSource.getRepository(Account),
    )

    const saltRounds = 10
    const passwordHash = await bcrypt
      .hash(password, saltRounds)
      .then(function (hash) {
        return hash
      })

    if (!passwordHash) {
      return response.status(500).json({ message: 'internal server error' })
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
      .catch((error) => {
        console.log(error)
        return response.status(500).json({ message: 'internal server error' })
      })
  }
}

export { CreateUserController }
