import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

const ensureGetTransactiondata = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const dateTo = req.query.dateTo

  const dateFrom = req.query.dateFrom

  const type = req.query.type

  const getTransactionSchema = Joi.object({
    dateFrom: Joi.date().optional(),
    dateTo: Joi.date().optional(),
    type: Joi.string().valid('cash-in', 'cash-out').optional(),
  }).optional()

  const validation = getTransactionSchema.validate({
    dateFrom: dateFrom === 'Invalid Date' ? undefined : dateFrom,
    dateTo: dateTo === 'Invalid Date' ? undefined : dateTo,
    type,
  })

  if (!validation.error) {
    return next()
  }

  return res.status(400).json({ error: validation.error?.message })
}

export { ensureGetTransactiondata }
