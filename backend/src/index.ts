process.loadEnvFile()
import app from './app'
import { NODE_ENV, PORT } from './constants/env'
import connectToDB from './config/db'
import { logger } from './utils/logger'

app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT} in ${NODE_ENV} environment.`)
  await connectToDB()
})
