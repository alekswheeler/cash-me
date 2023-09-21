import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Account } from './Account'

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @OneToOne(() => Account)
  @JoinColumn({
    name: 'account_id',
  })
  account: Account

  constructor(username: string, password: string, account: Account) {
    this.id = uuidv4()
    this.username = username
    this.password = password
    this.account = account
  }
}

export { User }
