import { AuthorizationError, NotFoundError, resolver } from "blitz"
import { db } from "db"
import { z } from "zod"
export default resolver.pipe(
  resolver.zod(z.object({ transactionId: z.string() })),
  resolver.authorize(),
  async ({ transactionId }, ctx) => {
    const userId = ctx.session.userId

    const transaction = await db.transaction.fromId(transactionId)
    if (!transaction) {
      throw new NotFoundError(`No transaction found with id: ${transactionId}`)
    }

    if (transaction.data.userId !== userId) {
      throw new AuthorizationError(
        `You are not allowed to delete transactions of other users`,
      )
    }

    return db.transaction.delete(transaction)
  },
)
