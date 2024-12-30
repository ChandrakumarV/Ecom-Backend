import { z } from 'zod'

export const updateProfileSchema = z.object({
  firstName: z.string().max(20),
  lastName: z.string().max(40),
  email: z.string().email(),
  password: z.string().optional()
})
