/**
 *
 *  Implementei essa classe para adicionar mais indepência e
 *  fraco acoplamento entre as unidades de código. Porém,
 *  por conta de tempo não pude criar as interfaces e refatorar o
 *  código para que a comunicação se dê pelas interfaces
 *
 */

import * as JWT from 'jsonwebtoken'
import { config } from 'dotenv'

export interface ItokenGeneratorData {
  username: string
}

export interface IPayload {
  username: string
}

class JWTServices {
  private readonly secret: string

  constructor() {
    config()
    this.secret = process.env.SECRET as string
  }

  /**
   *
   * @param param0 Object with contains token payload
   * @returns the token string generated with default configs
   *
   */
  async generateToken({ username }: ItokenGeneratorData): Promise<string> {
    const token = JWT.sign({ username }, this.secret, {
      expiresIn: '24h',
      algorithm: 'HS256',
    })

    return token
  }

  /**
   *
   * @param token Token to validate
   * @returns Returns the token data (payload) to auditctions
   */
  validateToken(token: string): IPayload {
    const dec = JWT.verify(token, process.env.SECRET as string)

    return dec as unknown as IPayload
  }
}

export { JWTServices }
