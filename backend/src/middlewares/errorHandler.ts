import { ErrorRequestHandler, Response } from 'express'
import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_CONTENT } from '../constants/http'
import { z } from 'zod'

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

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next): any => {
  if (err instanceof z.ZodError){
    return zodErrorHandler(err, res)
  }

  return res.status(INTERNAL_SERVER_ERROR).send('Internal Server Error')
}

export default errorHandler
