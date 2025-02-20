import * as z from 'zod'

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.enum(['superadmin', 'admin', 'writer'], { message: 'Invalid role' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})
