import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const ensureMakeTransferData = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { to, value } = request.body
  const makeTransferSchema = Joi.object({
    to: Joi.string().required(),
    value: Joi.number().greater(0).required(),
  }).required()

  const validation = makeTransferSchema.validate({ to, value })

  if (!validation.error) {
    return next()
  }

  return response.status(400).json({ error: validation.error?.message })
}

export { ensureMakeTransferData }
