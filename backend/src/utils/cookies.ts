import { CookieOptions, Response } from 'express'
import { tenMinutesFromNow, thirtyDaysFromNow } from './date'
import { NODE_ENV } from '../constants/env'

const REFRESH_PATH = '/auth/refresh'
const secure = NODE_ENV !== 'development'

const defaultsTokenCookieOptions: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure
}

export const accessTokenCookieOptions: CookieOptions = {
  ...defaultsTokenCookieOptions,
  expires: tenMinutesFromNow()
}

export const refreshTokenCookieOptions: CookieOptions = {
  ...defaultsTokenCookieOptions,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH
}

interface Params {
  res: Response
  accessToken: string
  refreshToken: string
}

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie('accessToken', accessToken, accessTokenCookieOptions)
    .cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
