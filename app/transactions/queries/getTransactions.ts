import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetTransactions = z.object({
  userId: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetTransactions),
  resolver.authorize(),
  async ({ userId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const transactions = await db.transaction.findMany({
      where: { userId },
    })

    if (!transactions) throw new NotFoundError()

    return transactions
  },
)
