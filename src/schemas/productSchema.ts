import { z } from 'zod'

export const addProductSchema = z.object({
  name: z.string().max(20),
  detail: z.string().max(40),
  price: z.number(),
  rating: z.number().max(5),
  sales: z.number(),
  offer: z.number(),
  seller: z.string()
})

export const updateProductSchema = addProductSchema
