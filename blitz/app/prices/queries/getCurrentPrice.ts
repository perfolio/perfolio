import { resolver } from "blitz"
import { getCurrentPrice } from "integrations/iexcloud"
import { z } from "zod"

export default resolver.pipe(
  resolver.zod(z.object({ symbol: z.string() })),
  resolver.authorize(),
  async ({ symbol }) => {
    return getCurrentPrice(symbol)
  },
)
