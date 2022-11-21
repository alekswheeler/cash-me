import { Request, Response } from 'express'
import { Account } from '../../entities/Account'
import { AccountsRepositories } from '../../repositories/implementations/AccountsRepositories'
import { User } from '../../entities/User'
import { UsersRepositories } from '../../repositories/implementations/UsersRepositories'
import { AppDataSource } from '../dataSourceInstance'

class CreateUserController {
  async handle(request: Request, response: Response) {
    const usersRepositories = new UsersRepositories(
      AppDataSource.getRepository(User),
    )

    const { username, password } = request.body

    const userAlreadyExists = await usersRepositories.findByUsername(username)

    if (userAlreadyExists) {
      console.log('User already exists')
      return response
        .status(400)
        .json({ message: 'user already exists' })
        .send()
    } else {
      console.log('User does not exist')
    }

    const accountsRepositories = new AccountsRepositories(
      AppDataSource.getRepository(Account),
    )

    let user: User
    let account: Account

    try {
      account = await accountsRepositories.create()
      user = new User(username, password, account)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ error: 'Internal Server Error1' })
    }

    return await usersRepositories
      .save(user)
      .then((user) => {
        return response.status(201).json(user)
      })
      .catch((error) => {
        console.log(error)
        return response.status(500).json({ error: 'Internal Server Error2' })
      })
  }
}

export { CreateUserController }
