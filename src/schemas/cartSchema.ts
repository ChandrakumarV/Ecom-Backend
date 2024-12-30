import { z } from 'zod'

export const addCartSchema = z.object({
  productId: z.number()
})
export const updateCartSchema = z.object({
  quantity: z.number().min(1)
})
