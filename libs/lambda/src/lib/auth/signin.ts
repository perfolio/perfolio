import { MiddlewareContext } from "@perfolio/middleware"
import { v4 as uuid } from "uuid"
import { createHmac } from "crypto"
import { setRefreshCookie } from "@perfolio/tokens"
import { db } from "@perfolio/db"
import { z } from "zod"
import { JWT } from "@perfolio/tokens"
export const SigninRequestValidation = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type SigninRequest = z.infer<typeof SigninRequestValidation>
export type SigninResponse = { accessToken: string }

export async function signin(
  { email, password }: SigninRequest,
  { res }: MiddlewareContext,
): Promise<SigninResponse> {
  const user = await db().user.signin({ email, password })
  const newRefreshToken = uuid()
  await db().refreshToken.create({
    userId: user.id,
    hashedToken: createHmac("sha256", newRefreshToken).digest("hex").toString(),
    expiresAt: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
  })

  setRefreshCookie(res, newRefreshToken)
  return {
    accessToken: JWT.sign({
      userId: user.id,
      username: user.data.username,
      email: user.data.email,
    }),
  }
}
