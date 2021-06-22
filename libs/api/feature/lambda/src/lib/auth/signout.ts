import { MiddlewareContext } from "@perfolio/api/feature/middleware"
import { db } from "@perfolio/data-access/db"

export async function signout(_: void, { claims }: MiddlewareContext) {
  if (!claims) {
    throw new Error(`Unable to sign out, claims is undefined`)
  }

  db().refreshToken.deleteFromUser(claims.userId)

  return {}
}
