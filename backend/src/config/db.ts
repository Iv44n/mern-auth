import { connect } from 'mongoose'
import { DB_URI } from '../constants/env'
import { logger } from '../utils/logger'

const connectToDB = async () => {
  try {
    await connect(DB_URI)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

export default connectToDB
