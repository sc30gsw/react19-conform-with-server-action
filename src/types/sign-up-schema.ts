import { z } from 'zod'

export const signUpSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email is invalid' })
    .max(100),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password is too short' })
    .max(100)
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'password needs including alphabet and number',
    ),
  age: z
    .number({ required_error: 'Age is required' })
    .nonnegative({ message: 'Age is more than 0' }),
  gender: z
    .enum(['male', 'female', 'other'], {
      required_error: 'Gender is required',
      message: 'Gender is invalid',
    })
    .default('other'),
  isAgree: z
    .enum(['on', 'off'], {
      required_error: 'Agreement is required',
      message: 'Please check',
    })
    .refine((val) => val !== 'on', {
      message: 'Please check',
    }),
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>
