import { resolver } from "blitz"
import { z } from "zod"
import { db } from "db"
import getSymbol from "app/iex/queries/getSymbol"
import createSymbol from "../mutations/createSymbol"

export default resolver.pipe(
  resolver.zod(z.object({ isin: z.string().regex(/[A-Z]{2}[a-zA-Z0-9]{10}/) })),
  resolver.authorize(),
  async ({ isin }, ctx) => {
    const cachedSymbol = await db.symbol.fromIsin(isin)
    if (!!cachedSymbol) {
      return cachedSymbol
    }

    const { symbol } = await getSymbol({ isin }, ctx)

    return createSymbol({ symbol, isin }, ctx)
  },
)
