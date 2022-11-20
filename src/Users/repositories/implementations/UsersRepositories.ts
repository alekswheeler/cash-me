import { Repository } from 'typeorm'
import { User } from '../../entities/User'
import { IUsersRepositories } from '../IUsersRepositories'

class UsersRepositories implements IUsersRepositories {
  private repository: Repository<User>

  constructor(repository: Repository<User>) {
    this.repository = repository
  }

  async save(user: User): Promise<User> {
    return await this.repository
      .save(user)
      .then((user) => {
        return user
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const response = await this.repository.findOneBy({
      username,
    })
    if (!response) {
      return undefined
    }
    return response
  }
}

export { UsersRepositories }
