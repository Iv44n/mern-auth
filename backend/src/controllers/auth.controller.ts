import { RequestHandler } from 'express'
import { CREATED } from '../constants/http'
import { loginSchema, registerSchema } from '../schemas/auth.schema'
import { createAcount, loginUser } from '../services/auth.service'
import AppError from '../utils/AppError'
import { setAuthCookies } from '../utils/cookies'

export const registerHandler: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent']
    })

    const { user, accessToken, refreshToken } = await createAcount(request)

    return setAuthCookies({ res, accessToken, refreshToken })
      .status(CREATED).json(user)

  } catch (error) {
    if(error instanceof AppError){
      return res.status(error.statusCode).json({ error: error.message })
    }

    return next(error)
  }
}

export const loginHandler: RequestHandler = async (req, res, next): Promise<any> => {
  try {

    const request = loginSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent']
    })

    const { user, accessToken, refreshToken } = await loginUser(request)

    return setAuthCookies({ res, accessToken, refreshToken })
      .status(CREATED).json(user)

  } catch (error) {
    if(error instanceof AppError){
      return res.status(error.statusCode).json({ error: error.message })
    }

    return next(error)
  }
}
