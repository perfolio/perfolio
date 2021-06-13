import { withPreflightChecks, withAuthentication, use, MiddlewareContext } from "../../../../lib"
import { removeAuthCookie } from "@perfolio/auth"
import { db } from "@perfolio/db"

export async function signout(_: void, { res, claims }: MiddlewareContext) {
  if (!claims) {
    throw new Error(`Unable to sign out, claims is undefined`)
  }

  db().refreshToken.deleteFromUser(claims.userId)

  removeAuthCookie(res)
  return {}
}
export default use(signout, [withPreflightChecks, withAuthentication])
