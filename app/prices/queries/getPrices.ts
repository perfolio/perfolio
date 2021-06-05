import { Time } from "app/time"
import { resolver } from "blitz"
import { db } from "db"
import {
  getHistory as getHistoryFromCloud,
  getPrice as getPriceFromCloud,
} from "integrations/iexcloud"
import { z } from "zod"
import createPrice from "../mutations/createPrice"

export default resolver.pipe(
  resolver.zod(
    z.object({ symbol: z.string(), begin: z.number(), end: z.number() }),
  ),
  resolver.authorize(),
  async ({ symbol, begin, end }, ctx) => {
    symbol = symbol.toLowerCase()
    if (symbol.includes("_")) {
      symbol = symbol.split("_")[1]!
    }
    if (symbol.includes("-")) {
      symbol = symbol.split("-")[0]!
    }
    console.time("cachedPrices")
    let cachedPrices = await db.price.fromSymbol(
      symbol,
      Time.fromTimestamp(begin),
      Time.fromTimestamp(end),
    )
    console.timeEnd("cachedPrices")
    console.log("cachedPrices:", cachedPrices.length, cachedPrices[0], cachedPrices[cachedPrices.length-1])
    /**
     * In case this is a new company we load everything in bulk and return immediately
     * because we are certain there are no dates missing.
     */
    if (cachedPrices.length < 100) {
      console.log("bulk import")
      const allPrices = await getHistoryFromCloud(symbol)
      cachedPrices = await Promise.all(
        allPrices.map((price) =>
          createPrice(
            {
              symbol,
              time: Time.fromDate(new Date(price.date)).unix(),
              value: price.close,
            },
            ctx,
          ),
        ),
      )
    }
    /**
     * If we have a subset of dates but potentially missing a few we fetch the missing
     * ones in parallel.
     */
    /**
     * Has the format:
     * [unixTimestamp]: value.
     */
    const priceMap: Record<number, number> = {}
    cachedPrices.forEach((price) => {
      priceMap[price.data.time] = price.data.value
    })
    const priceRequests: Time[] = []
    for (
      let day = Time.fromTimestamp(begin);
      day.unix() <= end;
      day = day.nextDay()
    ) {
      if (!priceMap[day.unix()]) {
        priceRequests.push(day)
      }
    }
    console.log("priceRequests:", priceRequests.length)
    const newPrices = await Promise.all(
      priceRequests.map(async (time) => {
        const price = await getPriceFromCloud(symbol, time)

        const saved = await createPrice(
          {
            symbol,
            time: time.unix(),
            value: price.close,
          },
          ctx,
        )
        console.log({ saved })
        return saved
      }),
    )
    console.log({ newPrices })

    newPrices.forEach((price) => {
      priceMap[price.data.time] = price.data.value
    })
    /**
     * Only return the prices the user originally requestes
     */
    const filteredPriceMap: Record<number, number> = {}
    Object.entries(priceMap).forEach(([ts, value]) => {
      if (value > 0 && Number(ts) >= begin && Number(ts) <= end) {
        filteredPriceMap[ts] = value
      }
    })
    return { prices: filteredPriceMap }
  },
)
