import { NextFunction, Request, Response } from 'express'
import { config } from 'dotenv'
import * as JWT from 'jsonwebtoken'

interface IPayload {
  username: string
}

const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization

  config()

  if (authHeader === undefined) {
    return response.status(401).json({ error: 'Missing authorization' })
  }

  const [, token] = authHeader.split(' ')

  if (!token) {
    return response.status(401).json({ error: 'Missing authorization' })
  }

  JWT.verify(token, process.env.SECRET as string, (error, payload) => {
    if (error) {
      return response.status(401).json({ error: 'Invalid token' })
    }
    const { username } = payload as IPayload
    request.username = username
    return next()
  })
}

export { ensureAuthenticated }
