import { z } from "zod"
import {
  getPrice as getPriceFromCloud,
  getHistory as getHistoryFromCloud,
} from "@perfolio/integrations/iexcloud"
import { Time } from "@perfolio/util/time"
import { Price } from "@perfolio/types"
import { Cache, Key } from "@perfolio/integrations/redis"

export const GetPricesRequestValidation = z.object({
  ticker: z.string(),
  begin: z.number(),
  end: z.number(),
})

export type GetPricesRequest = z.infer<typeof GetPricesRequestValidation>
export type GetPricesResponse = { prices: Record<number, number> }
export async function getPrices({
  ticker,
  begin,
  end,
}: GetPricesRequest): Promise<GetPricesResponse> {
  // if (ticker.includes("_")) {
  //   ticker = ticker.split("_")[1] ?? ticker
  // }
  // if (ticker.includes("-")) {
  //   ticker = ticker.split("-")[0] ?? ticker
  // }

  const key = new Key("getPrices", { ticker })

  let cachedPrices = await Cache.get<Price[]>(key)
  /**
   * In case this is a new company we load everything in bulk
   */
  if (!cachedPrices) {
    const allPrices = await getHistoryFromCloud(ticker)
    cachedPrices = allPrices.map((price) => {
      return {
        ticker,
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
      const price = await getPriceFromCloud(ticker, time)

      priceMap[time.unix()] = price.close
    }),
  )

  /**
   * Save ALL prices back to redis
   */
  Cache.set("1d", {
    key,
    value: Object.entries(priceMap).map(([time, value]) => {
      return {
        ticker,
        time,
        value,
      }
    }),
  })

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
