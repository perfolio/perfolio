import { MiddlewareContext } from "@perfolio/api/feature/middleware"
import { z } from "zod"
import { db, Transaction } from "@perfolio/integrations/fauna"

export const CreateTransactionRequestValidation = Transaction.schema.omit({
  userId: true,
})

export type CreateTransactionRequest = z.infer<typeof CreateTransactionRequestValidation>
export type CreateTransactionResponse = Transaction
export async function createTransaction(
  { value, assetId, executedAt, volume }: CreateTransactionRequest,
  { claims }: MiddlewareContext,
): Promise<CreateTransactionResponse> {
  return await db().transaction.create({
    userId: claims.sub,
    value,
    assetId,
    executedAt,
    volume,
  })
}
