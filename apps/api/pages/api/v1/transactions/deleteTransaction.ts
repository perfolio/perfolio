import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
  MiddlewareContext,
} from "../../../../lib"
import { z } from "zod"
import { db } from "@perfolio/db"

export const DeleteTransactionRequestValidation = z.object({
  transactionId: z.string(),
})

export type DeleteTransactionRequest = z.infer<typeof DeleteTransactionRequestValidation>

export async function createTransaction(
  { transactionId }: DeleteTransactionRequest,
  { claims }: MiddlewareContext,
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

export default use(createTransaction, [
  withPreflightChecks,
  withRequestValidation(DeleteTransactionRequestValidation),
  withAuthentication,
])
