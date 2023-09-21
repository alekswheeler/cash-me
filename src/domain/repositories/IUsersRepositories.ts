import { User } from '../models/User'

interface IUsersRepositories {
  save(user: User): Promise<User>
  findByUsername(username: string): Promise<User | undefined>
}

export { IUsersRepositories }
