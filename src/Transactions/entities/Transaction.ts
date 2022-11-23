import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { Account } from '../../Users/entities/Account'
import { v4 as uuidv4 } from 'uuid'

@Entity('transactions')
class Transaction {
  @PrimaryColumn()
  id: string

  @OneToOne(() => Account)
  @JoinColumn({
    name: 'credited_account_id',
  })
  creditedAccount: Account

  @OneToOne(() => Account)
  @JoinColumn({
    name: 'debited_account_id',
  })
  debitedAccount: Account

  @Column({
    type: 'numeric',
  })
  value: number

  @Column({
    type: 'date',
    default: 'current_date()',
    name: 'created_at',
  })
  createdAt: string

  constructor(
    creditedAccount: Account,
    debitedAccount: Account,
    value: number,
  ) {
    this.id = uuidv4()
    this.creditedAccount = creditedAccount
    this.debitedAccount = debitedAccount
    this.value = value
    this.createdAt = new Date().toLocaleDateString()
  }
}

export { Transaction }
