import { z } from "zod"
import {
  getPrice as getPriceFromCloud,
  getHistory as getHistoryFromCloud,
} from "@perfolio/iexcloud"
import { Time } from "@perfolio/time"
import { Price } from "@perfolio/types"
import { Cache, Key } from "@perfolio/cache"

export const GetPricesRequestValidation = z.object({
  symbol: z.string(),
  begin: z.number(),
  end: z.number(),
})

export type GetPricesRequest = z.infer<typeof GetPricesRequestValidation>
export type GetPricesResponse = { prices: Record<number, number> }
export async function getPrices({
  symbol,
  begin,
  end,
}: GetPricesRequest): Promise<GetPricesResponse> {
  // if (symbol.includes("_")) {
  //   symbol = symbol.split("_")[1] ?? symbol
  // }
  // if (symbol.includes("-")) {
  //   symbol = symbol.split("-")[0] ?? symbol
  // }

  const key = new Key("getPrices", { symbol })

  let cachedPrices = await Cache.get<Price[]>(key)
  /**
   * In case this is a new company we load everything in bulk
   */
  if (!cachedPrices) {
    const allPrices = await getHistoryFromCloud(symbol)
    cachedPrices = allPrices.map((price) => {
      return {
        symbol,
        time: Time.fromDate(new Date(price.date)).unix(),
        value: price.close,
      }
    })
  }
  /**
   * Figure out what dates are missing
   */
  /**
   * [unixTimestamp]: value.
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

  /**
   * Load remaining prices
   */
  await Promise.all(
    priceRequests.map(async (time) => {
      const price = await getPriceFromCloud(symbol, time)

      priceMap[time.unix()] = price.close
    }),
  )

  /**
   * Save ALL prices back to redis
   */
  Cache.set(
    key,
    Object.entries(priceMap).map(([time, value]) => {
      return {
        symbol,
        time,
        value,
      }
    }),
    30 * 24 * 60 * 60, // 30 days
  )

  /**
   * Only return the prices the user originally requestes
   */
  const filteredPriceMap: Record<number, number> = {}
  Object.entries(priceMap).forEach(([ts, value]) => {
    if (value > 0 && Number(ts) >= begin && Number(ts) <= end) {
      filteredPriceMap[Number(ts)] = value
    }
  })
  return { prices: filteredPriceMap }
}
