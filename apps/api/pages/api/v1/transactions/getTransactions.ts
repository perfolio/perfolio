import { withPreflightChecks, use, withAuthentication, MiddlewareContext } from "../../../../lib"
import { db } from "@perfolio/db"

export async function getTransactions(_: void, { claims }: MiddlewareContext) {
  return db().transaction.fromUser(claims.userId)
}

export default use(getTransactions, [withPreflightChecks, withAuthentication])
