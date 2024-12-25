import express, { Router } from 'express'
import { login, logout, register } from './controller'
import { tokenValidation } from '../../middleware/tokenValidation'

const loginRouter: Router = express.Router()

loginRouter.post('/login', login)
loginRouter.post('/register', register)
loginRouter.delete('/logout', tokenValidation, logout)

export default loginRouter
