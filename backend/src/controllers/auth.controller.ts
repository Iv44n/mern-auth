import { RequestHandler } from 'express'
import { CREATED, OK } from '../constants/http'
import { loginSchema, registerSchema } from '../schemas/auth.schema'
import { createAcount, loginUser } from '../services/auth.service'
import { setAuthCookies } from '../utils/cookies'
import catchErrors from '../utils/catchErrors'
import { verifyToken } from '../utils/jwt'
import { JWT_SECRET } from '../constants/env'
import SessionModel from '../models/session.model'

export const registerHandler: RequestHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent']
  })

  const { user, accessToken, refreshToken } = await createAcount(request)

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED).json(user)
})

export const loginHandler: RequestHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent']
  })

  const { user, accessToken, refreshToken } = await loginUser(request)

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED).json(user)
})

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken
  const { payload } = verifyToken(accessToken, { secret: JWT_SECRET })

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId)
  }

  return res.clearCookie('accessToken').clearCookie('refreshToken', { path: '/auth/refresh' }).status(OK).json({
    message: 'Logout successful'
  })
})
