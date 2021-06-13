import { MiddlewareContext } from "@perfolio/middleware"
import { db, RefreshToken } from "@perfolio/db"
import { getTokenFromCookies, JWT } from "@perfolio/tokens"
import { createHmac } from "crypto"
export type RefreshResponse = { accessToken: string }
export const refresh = async (_: void, { req }: MiddlewareContext): Promise<RefreshResponse> => {
  const existingRefreshToken = getTokenFromCookies(req)
  if (!existingRefreshToken) {
    throw new Error(`Missing refresh token in cookies`)
  }

  const refreshToken: RefreshToken | null = await db().refreshToken.fromHash(
    createHmac("sha256", existingRefreshToken).digest("hex").toString(),
  )
  if (!refreshToken) {
    throw new Error(`No refresh token found, please log in again`)
  }

  const user = await db().user.fromId(refreshToken.data.userId)
  if (!user) {
    throw new Error(`No user found, please create an account`)
  }

  const accessToken = JWT.sign({
    userId: user.id,
    username: user.data.username,
  })

  return { accessToken }
}
