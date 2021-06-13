import { MiddlewareContext } from "@perfolio/middleware"
import { db, Transaction } from "@perfolio/db"

export type GetTransactionsResponse = Transaction[]
export async function getTransactions(
  _: void,
  { claims }: MiddlewareContext,
): Promise<GetTransactionsResponse> {
  return db().transaction.fromUser(claims.userId)
}
