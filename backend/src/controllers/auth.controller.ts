import { RequestHandler } from 'express'
import { CREATED } from '../constants/http'
import { loginSchema, registerSchema } from '../schemas/auth.schema'
import { createAcount, loginUser } from '../services/auth.service'
import { setAuthCookies } from '../utils/cookies'
import catchErrors from '../utils/catchErrors'

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
