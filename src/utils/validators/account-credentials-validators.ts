import * as z from "zod"

 
export const SignUpValidation = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {message: "Please provide a valid email address."}),
  password: z.string().min(8, {message: "Your password is too short! Ensure it exceeds eight characters."})
})
 
export const SignInValidation = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {message: "Please provide a valid email address."}),
  password: z.string().min(8, {message: "Your password is too short! Ensure it exceeds eight characters."})
})

