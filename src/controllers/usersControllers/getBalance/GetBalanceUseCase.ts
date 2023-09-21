import { IUsersRepositories } from '../../../domain/repositories/IUsersRepositories'
import { AppError } from '../../../utils/AppError/AppError'

class GetBalanceUseCase {
  private readonly usersRepositories: IUsersRepositories
  constructor(usersRepositories: IUsersRepositories) {
    this.usersRepositories = usersRepositories
  }

  async execute(username: string): Promise<Number> {
    const user = await this.usersRepositories.findByUsername(username)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user.account.balance
  }
}

export { GetBalanceUseCase }
