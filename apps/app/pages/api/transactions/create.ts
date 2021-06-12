import { withMiddleware } from "@perfolio/api-client"
import { Transaction, db } from "@perfolio/db"
import { Claims } from "@perfolio/auth"
import { z } from "zod"

export const CreateTransactionRequestValidation = Transaction.schema.omit({
  userId: true,
})

export type CreateTransactionRequest = z.infer<typeof CreateTransactionRequestValidation>

export type CreateTransactionResponse = z.infer<typeof Transaction.schema>

export async function createTransactionApiHandler(
  { value, assetId, executedAt, volume }: CreateTransactionRequest,
  claims: Claims,
) {
  return await db().transaction.create({
    userId: claims.userId,
    value,
    assetId,
    executedAt,
    volume,
  })
}
export default withMiddleware(createTransactionApiHandler, CreateTransactionRequestValidation)
