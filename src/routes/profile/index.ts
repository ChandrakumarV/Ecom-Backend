import express, { Router } from 'express'
import { getProfile, updateProfile } from './controller'
import { validateData } from '../../middleware/validationMiddleware'
import { updateProfileSchema } from '../../schemas/profileSchema'

const profileRouter: Router = express.Router()

profileRouter.get('/', getProfile)
profileRouter.post('/', validateData(updateProfileSchema), updateProfile)

export default profileRouter
