import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const verifyUserData = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string()
      // Mínimo 8 characters, no máximo 15, pelo menos uma letra maiúscula, uma letra minúscula e um número
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)
      .required(),
  })

  const validation = schema.validate(req.body)

  if (!validation.error) {
    return next()
  }

  return res.status(400).json({ error: validation.error?.message })
}

export { verifyUserData }
