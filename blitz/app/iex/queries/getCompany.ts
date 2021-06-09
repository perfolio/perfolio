import { resolver } from "blitz"
import { z } from "zod"
import { getCompany } from "integrations/iexcloud"
const GetCompany = z.object({
  symbol: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetCompany),
  resolver.authorize(),
  async ({ symbol }) => {
    return getCompany(symbol)
  },
)
