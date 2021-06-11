import { withMiddleware } from "@perfolio/api"
import { Transaction, db } from "@perfolio/db"
import { Claims } from "@perfolio/auth"
import { z } from "zod"

export const DeleteTransactionRequestValidation = z.object({
  transactionId: z.string(),
})

export type DeleteTransactionRequest = z.infer<typeof DeleteTransactionRequestValidation>

export type DeleteTransactionResponse = z.infer<typeof Transaction.schema>

export async function createTransactionApiHandler(
  { transactionId }: DeleteTransactionRequest,
  claims: Claims,
) {
  const transaction = await db().transaction.fromId(transactionId)
  if (!transaction) {
    throw new Error(`No transaction found with id: ${transactionId}`)
  }

  if (transaction.data.userId !== claims.userId) {
    throw new Error(`You are not allowed to delete transactions of other users`)
  }

  db().transaction.delete(transaction)
}
export default withMiddleware(createTransactionApiHandler, DeleteTransactionRequestValidation)
