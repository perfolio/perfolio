import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateTransaction = z.object({
  userId: z.string(),
  assetId: z.string(),
  quantity: z.number(),
  value: z.number(),
  executedAt: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateTransaction),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const transaction = await db.transaction.create({ data: input })

    return transaction
  },
)
