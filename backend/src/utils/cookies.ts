import { CookieOptions, Response } from 'express'
import { tenMinutesFromNow, thirtyDaysFromNow } from './date'
import { NODE_ENV } from '../constants/env'

export const REFRESH_PATH = '/auth/refresh'
const secure = NODE_ENV !== 'development'

const defaultCookieOptions: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure
}

export const accessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  expires: tenMinutesFromNow()
}

export const refreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH
}

interface AuthCookiesParams {
  res: Response
  accessToken: string
  refreshToken: string
}

export const setAuthCookies = ({ res, accessToken, refreshToken }: AuthCookiesParams): Response => {
  return res
    .cookie('accessToken', accessToken, accessTokenCookieOptions)
    .cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
}

export const clearAuthCookies = ({ res }: { res: Response }): Response => {
  return res
    .clearCookie('accessToken')
    .clearCookie('refreshToken', { path: REFRESH_PATH })
}
