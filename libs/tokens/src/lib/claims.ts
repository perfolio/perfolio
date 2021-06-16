import { z } from "zod"

export const UserClaimsValidator = z.object({
  userId: z.string(),
  username: z.string(),
  email: z.string().email(),
})

export type UserClaims = z.infer<typeof UserClaimsValidator>
