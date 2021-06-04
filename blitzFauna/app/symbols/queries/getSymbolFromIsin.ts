import { Symbol } from "db"
import {
  getIsinMapping as getIsinMappingFromCloud,
  GetVolumeByVenue,
  getVolumeByVenue as getVolumeByVendorFromCloud,
} from "integrations/iexcloud"
import { NotFoundError } from "blitz"
import { Time } from "app/time"

import { resolver } from "blitz"
import { z } from "zod"
export const GetSymbolFromIsinValidation = z.object({
  isin: z.string().regex(/[A-Z]{2}[a-zA-Z0-9]{10}/),
})

export type GetSymbolFromIsin = z.infer<typeof GetSymbolFromIsinValidation>

export type GetIsinResponse = {
  symbol: Symbol
}

export default resolver.pipe(
  resolver.zod(z.object({ isin: z.string().regex(/[A-Z]{2}[a-zA-Z0-9]{10}/) })),
  resolver.authorize(),
  async ({ isin }) => {
    const possibleSymbols = await getPossibleSymbols(isin)

    /**
     * If there is a symbol with neither a country prefix (`US_`) or exchange suffix (`-ch`)
     * we could assume that's the main one.
     */
    const quickFind = possibleSymbols.find(
      (symbol) =>
        !symbol.data.symbol.includes("_") && !symbol.data.symbol.includes("-"),
    )
    if (quickFind) {
      return quickFind
    }
  },
)

/**
 * Return all symbols associated with this isin.
 */
async function getPossibleSymbols(isin: string): Promise<Symbol[]> {
  const token = process.env.FAUNA_SERVER_KEY!
  const isinMap = await getIsinMappingFromCloud(isin)
  return Promise.all(
    isinMap.map((i) => Symbol.create({ symbol: i.symbol, isin }, token)),
  )
}
