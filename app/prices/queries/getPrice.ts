import { resolver, NotFoundError } from "blitz"
import db from "db"
import { Cloud } from "integrations/iexcloud"
import { Time } from "pkg/time"
import * as z from "zod"

const GetStockPrice = z.object({
  isin: z.string(),
  time: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetStockPrice),
  resolver.authorize(),
  async ({ isin, time }) => {
    const cloud = new Cloud()
    const { symbol } = await cloud.getSymbol({ isin })

    let price = await db.price.findUnique({
      where: { symbol_time: { symbol: symbol.toLowerCase(), time } },
    })
    if (price) {
      return price
    }

    const newPrice = await cloud
      .getPrice({ symbol, time: Time.fromTimestamp(time) })
      .catch((err) => {
        throw new Error(`Unable to load closing price from cloud: ${err}`)
      })
    price = await db.price
      .upsert({
        where: {
          symbol_time: { symbol, time },
        },
        create: {
          symbol,
          time,
          value: newPrice.value,
        },
        update: { value: newPrice.value },
      })
      .catch((err) => {
        throw new Error(`Unable to store price for ${symbol}@${time} in database: ${err}`)
      })

    if (!price) throw new NotFoundError()

    return price
  },
)
