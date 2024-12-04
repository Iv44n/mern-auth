import { Router } from 'express'
import { getUserHandler } from '../controllers/user.controller'

const userRouters = Router()

userRouters.get('/', getUserHandler)

export default userRouters
