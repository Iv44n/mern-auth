import { z } from 'zod'
import { NOT_FOUND, OK } from '../constants/http'
import SessionModel from '../models/session.model'
import catchErrors from '../utils/catchErrors'
import AppError from '../utils/AppError'

export const getSessionsHandler = catchErrors(async (req, res) => {
  const sessions = await SessionModel.find(
    {
      userId: req.userId,
      expiresAt: { $gt: Date.now() }
    },
    {
      _id: 1,
      userAgent: 1,
      createdAt: 1
    },
    { sort: { createdAt: -1 } }
  )

  return res.status(OK).json(
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === req.sessionId && { isCurrent: true })
    }))
  )
})

export const deleteSessionHandler = catchErrors(async (req, res) => {
  const sessionId = z.string().parse(req.params.id)

  const deletedSession = await SessionModel.findOneAndDelete({
    _id: sessionId,
    userId: req.userId
  })

  if (!deletedSession) {
    throw new AppError(NOT_FOUND, 'Session not found')
  }

  return res.status(OK).json({ message: 'Session deleted' })
})
