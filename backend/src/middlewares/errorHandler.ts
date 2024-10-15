import { ErrorRequestHandler } from 'express'
import { logger } from '../utils/logger'

export const errorHandler: ErrorRequestHandler = (err, _req, res): any => {
  logger.error(err.message)
  return res.status(500).send('Internal Server Error')
}

export default errorHandler
