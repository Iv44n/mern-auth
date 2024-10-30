import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env'
import { CONFLICT, UNAUTHORIZED } from '../constants/http'
import SessionModel from '../models/session.model'
import UserModel from '../models/user.model'
import AppError from '../utils/AppError'
import { signToken } from '../utils/jwt'

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

  const refreshToken = signToken({
    sessionId: session._id
  }, { secret: JWT_REFRESH_SECRET, expiresIn: '30d' })

  const accessToken = signToken({
    userId,
    sessionId: session._id
  }, { secret: JWT_SECRET, expiresIn: '10m' })

  return {
    user: user.omitPassword(),
    refreshToken,
    accessToken
  }
}

interface loginParams {
  email: string
  password: string
  userAgent?: string
}

export const loginUser = async (data: loginParams) => {
  const { email, password, userAgent } = data

  const user = await UserModel.findOne({ email })

  if(!user){
    throw new AppError(UNAUTHORIZED, 'Invalid email or password')
  }

  const isValidPassword = await user.comparePassword(password)

  if(!isValidPassword){
    throw new AppError(UNAUTHORIZED, 'Invalid email or password')
  }

  const userId = user._id

  const session = await SessionModel.create({
    userId,
    userAgent
  })

  const refreshToken = signToken({
    sessionId: session._id
  }, { secret: JWT_REFRESH_SECRET, expiresIn: '30d' })

  const accessToken = signToken({
    userId,
    sessionId: session._id
  }, { secret: JWT_SECRET, expiresIn: '10m' })

  return {
    user: user.omitPassword(),
    refreshToken,
    accessToken
  }
}
