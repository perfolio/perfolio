import { resolver, NotFoundError } from "blitz"
import { getCurrentPrice } from "integrations/iexcloud"
import * as z from "zod"

const GetCurrentPrice = z.object({
  symbol: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetCurrentPrice),
  resolver.authorize(),
  async ({ symbol }) => {
    const price = await getCurrentPrice(symbol)

    if (!price) throw new NotFoundError()

    return price
  },
)
