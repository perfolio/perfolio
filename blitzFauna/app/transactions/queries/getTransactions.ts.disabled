import { resolver } from "blitz"
import { getTransactions } from "pkg/holdings"
import * as z from "zod"

const GetTransactions = z.object({
  userId: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetTransactions),
  resolver.authorize(),
  async ({ userId }) => {
    const { transactions } = await getTransactions({ userId })

    return transactions
  },
)
