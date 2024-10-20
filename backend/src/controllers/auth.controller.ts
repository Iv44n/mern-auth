import { RequestHandler } from 'express'
import { CREATED } from '../constants/http'
import { registerSchema } from '../schemas/auth.schema'
import { createAcount } from '../services/auth.service'
import AppError from '../utils/AppError'

export const registerHandler: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent']
    })

    const data = await createAcount(request)

    return res.status(CREATED).json(data)
  } catch (error) {
    if(error instanceof AppError){
      return res.status(error.statusCode).json({ error: error.message })
    }

    return next(error)
  }
}
