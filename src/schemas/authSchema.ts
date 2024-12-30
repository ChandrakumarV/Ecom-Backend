import { z } from 'zod'

export const registrationSchema = z.object({
  firstName: z.string().max(15),
  lastName: z.string().max(15),
  email: z.string().email(),
  password: z.string().min(8).max(12)
})

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(8)
})
