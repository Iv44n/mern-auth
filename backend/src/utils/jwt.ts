import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken'
import { SessionDocument } from '../models/session.model'
import { UserDocument } from '../models/user.model'
import Audience from '../constants/audience'

export type AccessTokenPayload = {
  userId: UserDocument['_id']
  sessionId: SessionDocument['_id']
}

export type RefreshTokenPayload = {
  sessionId: SessionDocument['_id']
}

type TokenPayload = AccessTokenPayload | RefreshTokenPayload

type SignOptionsAndSecret = SignOptions & {
  secret: string
}

const defaults: SignOptions = {
  audience: [Audience.User]
}

export const signToken = (payload: TokenPayload, options: SignOptionsAndSecret) => {
  const { secret, ...signOptions } = options

  return sign(payload, secret, {
    ...defaults,
    ...signOptions
  })
}

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options: VerifyOptions & { secret: string }
) => {
  const { secret, ...verifyOpts } = options
  try {
    const payload = verify(token, secret, {
      ...defaults,
      ...verifyOpts
    }) as TPayload

    return { payload }
  } catch (error: any) {
    return { error: error.message }
  }
}
