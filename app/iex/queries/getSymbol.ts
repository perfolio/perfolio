import { resolver } from "blitz"
import { z } from "zod"
import { getIsinMapping, getVolumeByVenue } from "integrations/iexcloud"
const GetSymbol = z.object({
  isin: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetSymbol),
  resolver.authorize(),
  async ({ isin }) => {
    const possibleSymbols = await getIsinMapping(isin)

    /**
     * If there is a symbol with neither a country prefix (`US_`) or exchange suffix (`-ch`)
     * we could assume that's the main one.
     */
    const quickFind = possibleSymbols.find(
      (symbol) => !symbol.symbol.includes("_") && !symbol.symbol.includes("-"),
    )
    if (quickFind) {
      return { symbol: quickFind.symbol }
    }

    /**
     * Search biggest venue for each symbol
     */
    const symbol = (
      await Promise.all(
        possibleSymbols.map(async (symbol) => {
          const venues = await getVolumeByVenue(symbol.symbol)
          return {
            volume: venues.sort((a, b) => b.volume - a.volume)[0]!.volume,
            symbol: symbol.symbol,
          }
        }),
      )
    ).sort((a, b) => b.volume - a.volume)[0]!
    return { symbol: symbol.symbol }
  },
)
