import { MiddlewareContext } from "@perfolio/api/feature/middleware"
import { db, Transaction } from "@perfolio/data-access/db"

export type GetTransactionsResponse = Transaction[]
export async function getTransactions(
  _: void,
  { claims }: MiddlewareContext,
): Promise<GetTransactionsResponse> {
  return db().transaction.fromUser(claims.userId)
}
