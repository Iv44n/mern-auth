import { RequestHandler } from 'express'
import AppError from '../utils/AppError'
import { UNAUTHORIZED } from '../constants/http'
import { verifyToken } from '../utils/jwt'
import { JWT_SECRET } from '../constants/env'

const authenticateHandler: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined

  if (!accessToken) {
    return next(new AppError(UNAUTHORIZED, 'Missing access token', 'InvalidAccessToken'))
  }

  const { payload, error } = verifyToken(accessToken, { secret: JWT_SECRET })

  if (error) {
    const errorMessage = error === 'jwt expired' ? 'Token expired' : 'Invalid token'
    return next(new AppError(UNAUTHORIZED, errorMessage, 'InvalidAccessToken'))
  }

  req.userId = payload?.userId
  req.sessionId = payload?.sessionId

  next()
}

export default authenticateHandler
