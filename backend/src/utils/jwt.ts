import { sign, SignOptions } from 'jsonwebtoken'
import { SessionDocument } from '../models/session.model'
import { UserDocument } from '../models/user.model'
import Audience from '../constants/audience'

type TokenPayload = {
  userId: UserDocument['_id']
  sessionId: SessionDocument['_id']
} | {
  sessionId: SessionDocument['_id']
}

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
