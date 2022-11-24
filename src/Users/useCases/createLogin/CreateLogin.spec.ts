import { AppError } from '../../../utils/AppError/AppError'
import { InMemoryAccountsRepositories } from '../../repositories/implementations/inMemoryAccountsRepositories'
import { InMemoryUsersRepositories } from '../../repositories/implementations/InMemoryUsersRepositories'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { CreateLoginUseCase } from './CreateLoginUseCase'

describe('Create Login', () => {
  let inMemoryUsersRepositories: InMemoryUsersRepositories
  const inMemoryAccountsRepository = new InMemoryAccountsRepositories()

  let createLoginUseCase: CreateLoginUseCase
  let createUserUseCase: CreateUserUseCase

  beforeEach(async () => {
    inMemoryUsersRepositories = new InMemoryUsersRepositories()

    createLoginUseCase = new CreateLoginUseCase(inMemoryUsersRepositories)
    createUserUseCase = new CreateUserUseCase(
      inMemoryUsersRepositories,
      inMemoryAccountsRepository,
    )
  })

  it('should be able to create a new login', async () => {
    await createUserUseCase.execute({
      username: 'John',
      password: 'Password123',
    })

    const token = await createLoginUseCase.execute({
      username: 'John',
      password: 'Password123',
    })

    expect(token).not.toBeNull()
  })

  it('should not be able authenticate user with worng credentials', async () => {
    await createUserUseCase.execute({
      username: 'John',
      password: 'Password123',
    })

    expect(async () => {
      await createLoginUseCase.execute({
        username: 'JohN',
        password: 'Password123',
      })
    }).rejects.toBeInstanceOf(AppError)

    expect(async () => {
      await createLoginUseCase.execute({
        username: 'John',
        password: 'Password123AA',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
