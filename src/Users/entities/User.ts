import { v4 as uuidv4 } from 'uuid'
import { Account } from './Account'

class User {
  id: string

  username: string

  password: string

  account: Account

  constructor(username: string, password: string, account: Account) {
    this.id = uuidv4()
    this.username = username
    this.password = password
    this.account = account
  }
}

export { User }
