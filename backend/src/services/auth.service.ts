import Audience from '../constants/audience'
import { JWT_SECRET } from '../constants/env'
import { CONFLICT } from '../constants/http'
import SessionModel from '../models/session.model'
import UserModel from '../models/user.model'
import AppError from '../utils/AppError'
import jwt from 'jsonwebtoken'

interface createAcountParams {
  email: string,
  username: string,
  password: string,
  userAgent?: string
}

export const createAcount = async (data: createAcountParams) => {
  const existingUser = await UserModel.exists({
    username: data.username,
    email: data.email
  })

  if(existingUser) {
    throw new AppError(CONFLICT, 'User or email already in use')
  }

  const user = await UserModel.create({
    username: data.username,
    email: data.email,
    password: data.password
  })

  const userId = user._id

  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent
  })

  const accessToken = jwt.sign(
    {
      userId,
      sessionId: session._id
    },
    JWT_SECRET,
    {
      expiresIn: '10m',
      audience: [Audience.User]
    }
  )

  return {
    user: user.omitPassword(),
    accessToken
  }
}
