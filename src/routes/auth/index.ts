import express, { Router } from 'express'
import { login, logout, register } from './controller'
import { tokenValidation } from '../../middleware/tokenValidation'
import { validateData } from '../../middleware/validationMiddleware'
import { loginSchema, registrationSchema } from '../../schemas/authSchema'

const loginRouter: Router = express.Router()

loginRouter.post('/login', validateData(loginSchema), login)
loginRouter.post('/register', validateData(registrationSchema), register)
loginRouter.delete('/logout', tokenValidation, logout)

export default loginRouter
