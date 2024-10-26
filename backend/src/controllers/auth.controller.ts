import { RequestHandler } from 'express'
import { CREATED } from '../constants/http'
import { registerSchema } from '../schemas/auth.schema'
import { createAcount } from '../services/auth.service'
import AppError from '../utils/AppError'
import { tenMinutesFromNow, thirtyDaysFromNow } from '../utils/date'

export const registerHandler: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent']
    })

    const { user, accessToken, refreshToken } = await createAcount(request)

    return res
      .cookie('accessToken', accessToken, {
        sameSite: 'strict',
        httpOnly: true,
        secure: false,
        expires: tenMinutesFromNow()
      })
      .cookie('refreshToken', refreshToken, {
        sameSite: 'strict',
        httpOnly: true,
        secure: false,
        expires: thirtyDaysFromNow(),
        path: '/auth/refresh'
      })
      .status(CREATED).json(user)

  } catch (error) {
    if(error instanceof AppError){
      return res.status(error.statusCode).json({ error: error.message })
    }

    return next(error)
  }
}
