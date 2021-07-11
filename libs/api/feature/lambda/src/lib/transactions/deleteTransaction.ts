import { MiddlewareContext } from "@perfolio/api/feature/middleware"
import { z } from "zod"
import { db } from "@perfolio/integrations/fauna"

export const DeleteTransactionRequestValidation = z.object({
  transactionId: z.string(),
})

export type DeleteTransactionRequest = z.infer<typeof DeleteTransactionRequestValidation>
export async function deleteTransaction(
  { transactionId }: DeleteTransactionRequest,
  { claims }: MiddlewareContext,
) {
  const transaction = await db().transaction.fromId(transactionId)
  if (!transaction) {
    throw new Error(`No transaction found with id: ${transactionId}`)
  }

  if (transaction.data.userId !== claims.sub) {
    throw new Error(`You are not allowed to delete transactions of other users`)
  }

  db().transaction.delete(transaction)
  return {}
}
