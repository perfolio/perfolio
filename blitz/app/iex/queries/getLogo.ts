import { resolver } from "blitz"
import { z } from "zod"
import { getLogo } from "integrations/iexcloud"
const GetLogo = z.object({
  symbol: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetLogo),
  resolver.authorize(),
  async ({ symbol }) => {
    return getLogo(symbol)
  },
)
