import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('accounts')
class Account {
  @PrimaryColumn()
  id: string

  @Column()
  balance: number

  constructor() {
    this.id = uuidv4()
    this.balance = 100
  }
}

export { Account }
