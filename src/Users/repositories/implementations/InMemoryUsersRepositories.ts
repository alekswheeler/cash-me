import { User } from '../../entities/User'
import { IUsersRepositories } from '../IUsersRepositories'

class InMemoryUsersRepositories implements IUsersRepositories {
  private static users: User[] = []

  async save(user: User): Promise<User> {
    InMemoryUsersRepositories.users.push(user)
    return user
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = InMemoryUsersRepositories.users.find(
      (user) => user.username === username,
    )
    return user
  }
}

export { InMemoryUsersRepositories }
