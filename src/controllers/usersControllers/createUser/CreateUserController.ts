import { Request, Response } from 'express'
import { AccountsRepositories } from '../../../persistence/repositories/AccountsRepositories'
import { CreateUserUseCase } from './CreateUserUseCase'
import { IAccountsRepositories } from '../../../domain/repositories/IAccountsRepositories'
import { IUsersRepositories } from '../../../domain/repositories/IUsersRepositories'
class CreateUserController {
  private usersRepositories: IUsersRepositories
  private accountsRepositories: IAccountsRepositories

  constructor(
    usersRepositories: IUsersRepositories,
    accountsRepositories: AccountsRepositories,
  ) {
    this.usersRepositories = usersRepositories
    this.accountsRepositories = accountsRepositories
  }

  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const createUserUseCase = new CreateUserUseCase(
      this.usersRepositories,
      this.accountsRepositories,
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
