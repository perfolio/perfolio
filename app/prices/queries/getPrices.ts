import { zodResolver } from "@hookform/resolvers/zod"
import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"
import { Cloud } from "integrations/iexcloud"
import { Time } from "pkg/time"
import * as z from "zod"
import getPrice from "./getPrice"
const GetStockPrices = z.object({
  symbol: z.string(),
  begin: z.number(),
  end: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetStockPrices),
  resolver.authorize(),
  async ({ symbol, begin, end }, ctx) => {
    symbol = symbol.toLowerCase()

    const cloud = new Cloud()
    let cachedPrices = await db.price.findMany({
      where: {
        AND: {
          symbol: {
            equals: symbol,
          },
          time: {
            gte: begin,
            lte: end,
          },
        },
      },
    })

    /**
     * In case this is a new company we load everything in bulk and return immediately
     * because we are certain there are no dates missing.
     */
    if (cachedPrices.length === 0) {
      console.debug(`No prices for ${symbol} found. Bulk importing from iex...`)
      const allPrices = await cloud.getHistory({ symbol })
      console.debug(`Processing ${allPrices.length} new prices for ${symbol}`)
      cachedPrices = await Promise.all(
        allPrices.map(async (price) => {
          return db.price.upsert({
            where: {
              symbol_time: {
                symbol,
                time: price.time.unix(),
              },
            },
            update: { time: price.time.unix(), value: price.value },
            create: { symbol, time: price.time.unix(), value: price.value },
          })
        }),
      )
    }
    /**
     * If we have a subset of dates but potentially missing a few we fetch the missing
     * ones in parallel.
     */

    /**
     * Has the format:
     * [unixTImestamp]: value.
     */
    const priceMap: Record<number, number> = {}
    cachedPrices.forEach((price) => {
      priceMap[price.time] = price.value
    })

    const priceRequests: Time[] = []
    for (let day = Time.fromTimestamp(begin); day.unix() <= end; day = day.nextDay()) {
      if (!priceMap[day.unix()]) {
        priceRequests.push(day)
      }
    }

    const newPrices = await Promise.all(
      priceRequests.map((time) => {
        return getPrice({ symbol, time: time.unix() }, ctx)
      }),
    )

    newPrices.forEach((price) => {
      priceMap[price.time] = price.value
    })

    const filteredPriceMap = {}
    Object.entries(priceMap).forEach(([ts, value]) => {
      if (value > 0 && Number(ts) >= begin && Number(ts) <= end) {
        filteredPriceMap[ts] = value
      }
    })

    return { prices: filteredPriceMap }
  },
)
