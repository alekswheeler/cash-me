import { User } from '../entities/User'

interface IUsersRepositories {
  save(user: User): Promise<User>
  findByUsername(username: string): Promise<User | undefined>
}

export { IUsersRepositories }
