import { withMiddleware } from "@perfolio/api"

import { db } from "@perfolio/db"
import { z } from "zod"
import { Claims } from "@perfolio/auth"
export const GetTransactionsRequestValidation = z.any()

export async function getTransactions(_: void, claims: Claims) {
  return await db().transaction.fromUser(claims.userId)
}

export default withMiddleware(getTransactions, GetTransactionsRequestValidation)
