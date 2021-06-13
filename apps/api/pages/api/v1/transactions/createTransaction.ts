import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
  MiddlewareContext,
} from "../../../../lib"
import { z } from "zod"
import { db, Transaction } from "@perfolio/db"

export const CreateTransactionRequestValidation = Transaction.schema.omit({
  userId: true,
})

export type CreateTransactionRequest = z.infer<typeof CreateTransactionRequestValidation>

export async function createTransaction(
  { value, assetId, executedAt, volume }: CreateTransactionRequest,
  { claims }: MiddlewareContext,
) {
  return await db().transaction.create({
    userId: claims.userId,
    value,
    assetId,
    executedAt,
    volume,
  })
}

export default use(createTransaction, [
  withPreflightChecks,
  withRequestValidation(CreateTransactionRequestValidation),
  withAuthentication,
])
