import { resolver } from "blitz"
import { getSymbolFromIsin, GetSymbolFromIsinValidation } from "pkg/iex"

export default resolver.pipe(
  resolver.zod(GetSymbolFromIsinValidation),
  resolver.authorize(),
  async ({ isin }) => {
    return getSymbolFromIsin({ isin })
  },
)
