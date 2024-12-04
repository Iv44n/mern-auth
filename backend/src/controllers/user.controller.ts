import { NOT_FOUND, OK } from '../constants/http'
import UserModel from '../models/user.model'
import AppError from '../utils/AppError'
import catchErrors from '../utils/catchErrors'

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId)

  if (!user) {
    throw new AppError(NOT_FOUND, 'User not found')
  }

  return res.status(OK).json(user.omitPassword())
})
