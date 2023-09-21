import { Transaction } from '../../../domain/models/Transaction'
import { User } from '../../../domain/models/User'
import { ITransactionsRepositories } from '../../../domain/repositories/ITransactionsRepositories'

interface IGetTransactionsUseCase {
  dateFrom?: string
  dateTo?: string
  type?: 'cash-in' | 'cash-out'
  user: User
}

class GetTransactionsUseCase {
  private readonly transactionsRepository: ITransactionsRepositories

  constructor(transactionsRepository: ITransactionsRepositories) {
    this.transactionsRepository = transactionsRepository
  }

  async execute({
    dateFrom,
    dateTo,
    type,
    user,
  }: IGetTransactionsUseCase): Promise<Transaction[]> {
    return await this.transactionsRepository.getTransactionsByUser(
      user,
      dateFrom,
      dateTo,
      type,
    )
  }
}

export { GetTransactionsUseCase }
