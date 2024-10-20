import { Router } from 'express'
import { registerHandler } from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/register', registerHandler)

export default authRoutes
