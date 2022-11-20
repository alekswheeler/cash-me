import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { Account } from '../../Accounts/Entities/Account'
import { v4 as uuidv4 } from 'uuid'

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
  accountId: string

  constructor(username: string, password: string, accountId: string) {
    this.id = uuidv4()
    this.username = username
    this.password = password
    this.accountId = accountId
  }
}

export { User }
