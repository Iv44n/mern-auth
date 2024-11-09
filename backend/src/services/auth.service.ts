import { APP_ORIGIN, JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env'
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from '../constants/http'
import VerificationCodeType from '../constants/verificationCodeType'
import SessionModel from '../models/session.model'
import UserModel from '../models/user.model'
import verificationCodeModel from '../models/verificationCode.model'
import AppError from '../utils/AppError'
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from '../utils/date'
import { getVerifyEmailTemplate } from '../utils/emailTemplates'
import { RefreshTokenPayload, signToken, verifyToken } from '../utils/jwt'
import { sendEmail } from '../utils/sendEmail'

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

  const verificationCode = await verificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow()
  })

  const url = `${APP_ORIGIN}/auth/email/verify/${verificationCode._id}`

  const { error } = await sendEmail({
    to: user.email,
    ...getVerifyEmailTemplate(url)
  })

  if (error) {
    throw new AppError(INTERNAL_SERVER_ERROR, 'Error sending verification email')
  }

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

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: JWT_REFRESH_SECRET
  })

  if (!payload) {
    throw new AppError(UNAUTHORIZED, 'Invalid refresh token')
  }

  const session = await SessionModel.findById(payload.sessionId)

  if (!(session && session.expiresAt.getTime() > Date.now())) {
    throw new AppError(UNAUTHORIZED, 'Session expired')
  }

  const sessionNeedRefresh = session.expiresAt.getTime() - Date.now() <= ONE_DAY_MS

  if (sessionNeedRefresh) {
    session.expiresAt = thirtyDaysFromNow()
    await session.save()
  }

  const newRefreshToken = sessionNeedRefresh
    ? signToken({ sessionId: session._id }, { secret: JWT_REFRESH_SECRET, expiresIn: '30d' })
    : undefined

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id
  }, { secret: JWT_SECRET, expiresIn: '10m' })

  return {
    accessToken,
    newRefreshToken
  }
}

export const verifyEmail = async (code: string) => {
  const validCode = await verificationCodeModel.findOne({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() }
  })

  if (!validCode) {
    throw new AppError(NOT_FOUND, 'Invalid or expired verification code')
  }

  const updateUser = await UserModel.findOneAndUpdate(validCode.userId, {
    verified: true
  }, { new: true })

  if (!updateUser) {
    throw new AppError(INTERNAL_SERVER_ERROR, 'Failed to verify email')
  }

  await validCode.deleteOne()

  return {
    user: updateUser.omitPassword()
  }
}
