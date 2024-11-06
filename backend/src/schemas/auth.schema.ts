import { z } from 'zod'

export const emailShema = z
  .string()
  .email()
  .min(1, { message: 'Email is required' })
  .max(255)

const passwordShema = z.string().min(6).max(255)

export const loginSchema = z.object({
  email: emailShema,
  password: passwordShema,
  userAgent: z.string().optional()
})

export const registerSchema = z
  .object({
    email: emailShema,
    username: z.string().min(3).max(255),
    password: passwordShema,
    confirmPassword: passwordShema,
    userAgent: z.string().optional()
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export const verificationCodeSchema = z.string().min(1).max(24)
