import { Router } from 'express'
import { getUsers } from './controller'

const userRouter = Router()

userRouter.get('/', getUsers)

export default userRouter
