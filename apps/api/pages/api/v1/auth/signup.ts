import { withPreflightChecks, withRequestValidation, use } from "../../../../lib"

import { db } from "@perfolio/db"
import { z } from "zod"

export const SignupRequestValidation = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
})

export type SignupRequest = z.infer<typeof SignupRequestValidation>

export async function signup({ email, username, password }: SignupRequest) {
  await db().user.create({ username, email, password, role: "USER" })
  return {}
}
export default use(signup, [withPreflightChecks, withRequestValidation(SignupRequestValidation)])
