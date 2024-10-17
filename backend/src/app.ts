// IMPORT MODULES
import express from 'express'
import cors from 'cors'
import co from 'cookie-parser'
import { APP_ORIGIN } from './constants/env'

// IMPORT MIDDLEWARES
import requestLogger from './middlewares/requestLogger'
import errorHandler from './middlewares/errorHandler'

// IMPORT ROUTES
import authRoutes from './routes/auth.routes'

const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: APP_ORIGIN,
  credentials: true
}))
app.use(co())
app.use(requestLogger)

// ROUTES
app.use('/auth', authRoutes)

// ERROR HANDLERS
app.use(errorHandler)

export default app
