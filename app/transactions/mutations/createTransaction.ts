import { resolver } from "blitz"
import db from "db"
import { CreateTransaction } from "../validation"
export default resolver.pipe(
  resolver.zod(CreateTransaction),
  resolver.authorize(),
  async ({ value, assetId, executedAt, volume }, ctx) => {
    return await db.transaction.create({
      data: { userId: ctx.session.userId, value, assetId, executedAt, volume },
    })
  },
)
