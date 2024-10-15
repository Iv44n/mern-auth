import { RequestHandler } from 'express'
import { logger } from '../utils/logger'
import pc from 'picocolors'

const requestLogger: RequestHandler = (req, _res, next) => {
  const timestamp = new Date().toISOString()

  logger.info(`
    ${pc.bold(pc.cyan('========== REQUEST LOG =========='))}
    ${pc.bold('Timestamp:')} ${pc.yellow(timestamp)}
    ${pc.bold('Method:')}    ${pc.green(pc.italic(req.method))}
    ${pc.bold('Path:')}      ${pc.green(req.path)}
    ${pc.bold('Body:')}      ${pc.magenta(JSON.stringify(req.body, null, 2) || '{}')}
    ${pc.bold(pc.cyan('================================='))}
  `)

  next()
}

export default requestLogger
