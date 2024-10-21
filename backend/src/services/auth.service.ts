import { CONFLICT } from '../constants/http'
import userModel from '../models/user.model'
import AppError from '../utils/AppError'

interface createAcountParams {
  email: string,
  username: string,
  password: string,
  userAgent?: string
}

export const createAcount = async (data: createAcountParams) => {
  const existingUser = await userModel.exists({
    username: data.username,
    email: data.email
  })

  if(existingUser) {
    throw new AppError(CONFLICT, 'User or email already in use')
  }

  const user = await userModel.create({
    username: data.username,
    email: data.email,
    password: data.password
  })

  return user.omitPassword()
}
