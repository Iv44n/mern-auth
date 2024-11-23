import { ErrorRequestHandler, Response } from 'express'
import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_CONTENT } from '../constants/http'
import { z } from 'zod'
import AppError from '../utils/AppError'
import { clearAuthCookies, REFRESH_PATH } from '../utils/cookies'

const zodErrorHandler = (err: z.ZodError, res: Response) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message
  }))

  return res.status(UNPROCESSABLE_CONTENT).send({
    errors,
    message: JSON.parse(err.message)
  })
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (req.path === REFRESH_PATH) {
    clearAuthCookies({ res })
  }

  if (err instanceof z.ZodError){
    zodErrorHandler(err, res)
    return
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message })
    return
  }

  res.status(INTERNAL_SERVER_ERROR).send('Internal Server Error')
}

export default errorHandler
