import { MiddlewareContext } from "@perfolio/middleware"
import { db } from "@perfolio/db"

export async function signout(_: void, { claims }: MiddlewareContext) {
  if (!claims) {
    throw new Error(`Unable to sign out, claims is undefined`)
  }

  db().refreshToken.deleteFromUser(claims.userId)

  return {}
}
