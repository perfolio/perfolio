import { resolver } from "blitz"
import { db } from "db"
import * as z from "zod"

const GetTransactions = z.object({
  userId: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetTransactions),
  resolver.authorize(),
  async ({ userId }) => {
    return await db.transaction.fromUser(userId)
  },
)
