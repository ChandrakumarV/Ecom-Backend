import { Router } from 'express'
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  udpateProduct
} from './controller'
import { validateData } from '../../middleware/validationMiddleware'
import {
  addProductSchema,
  updateProductSchema
} from '../../schemas/productSchema'

const productRouter = Router()

productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)
productRouter.post('/', validateData(addProductSchema), addProduct)
productRouter.put('/:id', validateData(updateProductSchema), udpateProduct)
productRouter.delete('/:id', deleteProduct)

export default productRouter
