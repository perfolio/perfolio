import { Time } from "app/time"
import { resolver } from "blitz"
import { db } from "db"
import { getPrice } from "integrations/iexcloud"
import { z } from "zod"
import createPrice from "../mutations/createPrice"

export default resolver.pipe(
  resolver.zod(z.object({ symbol: z.string(), time: z.number().int() })),
  resolver.authorize(),
  async ({ symbol, time: ts }, ctx) => {
    symbol = symbol.toLowerCase()
    const time = Time.fromTimestamp(ts)

    let price = await db.price.fromSymbolAndTime(symbol, time)
    if (!!price) {
      return price
    }

    const newPrice = await getPrice(symbol, time)
    return createPrice(
      {
        symbol: symbol,
        time: time.unix(),
        value: newPrice.close,
      },
      ctx,
    )
  },
)
