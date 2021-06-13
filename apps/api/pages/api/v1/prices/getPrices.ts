import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
} from "../../../../lib"
import { z } from "zod"
import { db } from "@perfolio/db"
import {
  getPrice as getPriceFromCloud,
  getHistory as getHistoryFromCloud,
} from "@perfolio/iexcloud"
import { Time } from "@perfolio/time"

export const GetPriceRequestValidation = z.object({
  symbol: z.string(),
  begin: z.number(),
  end: z.number(),
})

export type GetPriceRequest = z.infer<typeof GetPriceRequestValidation>

export async function getPrices({ symbol, begin, end }: GetPriceRequest) {
  if (symbol.includes("_")) {
    symbol = symbol.split("_")[1] ?? symbol
  }
  if (symbol.includes("-")) {
    symbol = symbol.split("-")[0] ?? symbol
  }
  let cachedPrices = await db().price.fromSymbol(
    symbol,
    Time.fromTimestamp(begin),
    Time.fromTimestamp(end),
  )
  /**
   * In case this is a new company we load everything in bulk and return immediately
   * because we are certain there are no dates missing.
   *
   * TODO: I have to play with the length a bit.
   *
   * The idea is to get the right number to fetch the least amount of data from iex.
   * Considerations:
   * - Due to the entry of a transaction there probably are already a few entries, so
   *   I set it to 50 as a start.
   * - The only real issue I see is when a company does not have 50 days worth of prices
   *   yet. In this case we are overfetching every time this data is needed
   */
  if (cachedPrices.length === 50) {
    const allPrices = await getHistoryFromCloud(symbol)
    cachedPrices = await Promise.all(
      allPrices.map((price) =>
        db().price.create({
          symbol,
          time: Time.fromDate(new Date(price.date)).unix(),
          value: price.close,
        }),
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
  for (let day = Time.fromTimestamp(begin); day.unix() <= end; day = day.nextDay()) {
    if (!priceMap[day.unix()]) {
      priceRequests.push(day)
    }
  }
  const newPrices = await Promise.all(
    priceRequests.map(async (time) => {
      const price = await getPriceFromCloud(symbol, time)

      const saved = await db().price.create({
        symbol,
        time: time.unix(),
        value: price.close,
      })
      return saved
    }),
  )

  newPrices.forEach((price) => {
    priceMap[price.data.time] = price.data.value
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

export default use(getPrices, [
  withPreflightChecks,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])
