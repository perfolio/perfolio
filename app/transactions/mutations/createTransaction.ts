import { resolver } from "blitz"
import { db, Transaction } from "db"
export default resolver.pipe(
  resolver.zod(Transaction.schema.omit({ userId: true })),
  resolver.authorize(),
  async ({ value, assetId, executedAt, volume }, ctx) => {
    return await db.transaction.create({
      userId: ctx.session.userId,
      value,
      assetId,
      executedAt,
      volume,
    })
  },
)
