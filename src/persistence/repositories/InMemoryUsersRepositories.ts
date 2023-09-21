import { User } from '../../domain/models/User'
import { IUsersRepositories } from '../../domain/repositories/IUsersRepositories'

class InMemoryUsersRepositories implements IUsersRepositories {
  private users: User[] = []

  async save(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.username === username)
    return user
  }
}

export { InMemoryUsersRepositories }
