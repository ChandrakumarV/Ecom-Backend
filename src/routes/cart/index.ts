import { Router } from 'express'
import { addCart, getCarts, removeCart, udpateCart } from './controller'
import { validateData } from '../../middleware/validationMiddleware'
import { addCartSchema, updateCartSchema } from '../../schemas/cartSchema'

const cartRouter = Router()

cartRouter.get('/', getCarts)
cartRouter.post('/', validateData(addCartSchema), addCart)
cartRouter.put('/:id', validateData(updateCartSchema), udpateCart)
cartRouter.delete('/:id', removeCart)

export default cartRouter
