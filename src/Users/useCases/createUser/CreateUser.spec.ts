import { InMemoryAccountsRepositories } from '../../repositories/implementations/inMemoryAccountsRepositories'
import { InMemoryUsersRepositories } from '../../repositories/implementations/InMemoryUsersRepositories'
import { CreateUserUseCase } from './CreateUserUseCase'

describe('Create User', () => {
  let inMemoryUsersRepositories: InMemoryUsersRepositories
  let inMemoryAccountsRepository: InMemoryAccountsRepositories

  let createUserUseCase: CreateUserUseCase

  beforeEach(async () => {
    inMemoryUsersRepositories = new InMemoryUsersRepositories()
    inMemoryAccountsRepository = new InMemoryAccountsRepositories()

    createUserUseCase = new CreateUserUseCase(
      inMemoryUsersRepositories,
      inMemoryAccountsRepository,
    )
  })

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      username: 'John',
      password: 'Password123',
    })

    const userInMemory = await inMemoryUsersRepositories.findByUsername(
      user.username,
    )

    expect(userInMemory?.username).toEqual('John')
  })

  it('should not be able to create another existent user', () => {
    expect(async () => {
      await createUserUseCase.execute({
        username: 'John',
        password: 'Password123',
      })

      await createUserUseCase.execute({
        username: 'John',
        password: 'Password123',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
