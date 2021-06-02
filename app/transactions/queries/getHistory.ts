import { resolver } from "blitz"
import { getHistory } from "pkg/holdings"
import * as z from "zod"

const GetTransactions = z.object({
  userId: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetTransactions),
  resolver.authorize(),
  async ({ userId }) => {
    const history = await getHistory({ userId })
    return history
  },
)
