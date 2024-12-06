import { RequestHandler } from 'express'
import AppError from '../utils/AppError'
import { UNAUTHORIZED } from '../constants/http'
import { verifyToken } from '../utils/jwt'
import { JWT_SECRET } from '../constants/env'

const autenticateHandler: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined

  if (!accessToken) {
    throw new AppError(UNAUTHORIZED, 'Missing access token', 'InvalidAccessToken')
  }

  const { payload, error } = verifyToken(accessToken, { secret: JWT_SECRET })

  if (error) {
    throw new AppError(
      UNAUTHORIZED,
      error === 'jwt expired' ? 'Token expired' : 'Invalid token',
      'InvalidAccessToken'
    )
  }

  req.userId = payload?.userId
  req.sessionId = payload?.sessionId

  next()
}

export default autenticateHandler
