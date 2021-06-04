import db, { Currency } from "db"
import {
  getHistory,
  getPrice as getPriceFromCloud,
} from "integrations/iexcloud"
import * as z from "zod"
import { Time } from "pkg/time"

export const GetPricesRequestValidation = z.object({
  symbol: z.string(),
  begin: z.number(),
  end: z.number(),
})

export type GetPricesRequest = z.infer<typeof GetPricesRequestValidation>

export type GetPricesResponse = {
  prices: Record<number, number>
}

export async function getPrices(
  req: GetPricesRequest,
): Promise<GetPricesResponse> {
  let symbol = req.symbol.toLowerCase()
  if (symbol.includes("_")) {
    symbol = symbol.split("_")[1]!
  }
  if (symbol.includes("-")) {
    symbol = symbol.split("-")[0]!
  }
  let cachedPrices = await db.price.findMany({
    where: {
      AND: {
        symbol: {
          equals: symbol,
        },
        time: {
          gte: req.begin,
          lte: req.end,
        },
      },
    },
  })
  /**
   * In case this is a new company we load everything in bulk and return immediately
   * because we are certain there are no dates missing.
   */
  if (cachedPrices.length === 0) {
    const allPrices = await getHistory(symbol)

    await db.price
      .createMany({
        data: allPrices.map((price) => {
          return {
            symbol,
            time: Time.fromDate(new Date(price.date)).unix(),
            value: price.close,
            currency: Currency.USD,
          }
        }),
      })
      .catch(async (err) => {
        /**
         * Fall back to upserting every price individually
         */
        console.warn(err)
        await Promise.all(
          allPrices.map((price) => {
            const time = Time.fromDate(new Date(price.date)).unix()
            return db.price.upsert({
              where: {
                symbol_time_currency: {
                  symbol,
                  time,
                  currency: Currency.USD,
                },
              },
              update: { value: price.close },
              create: {
                symbol,
                time,
                currency: Currency.USD,
                value: price.close,
              },
            })
          }),
        )
      })
    cachedPrices = await db.price.findMany({
      where: {
        AND: {
          symbol: {
            equals: symbol,
          },
          time: {
            gte: req.begin,
            lte: req.end,
          },
        },
      },
    })
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
  for (
    let day = Time.fromTimestamp(req.begin);
    day.unix() <= req.end;
    day = day.nextDay()
  ) {
    if (!priceMap[day.unix()]) {
      priceRequests.push(day)
    }
  }
  const newPrices = await Promise.all(
    priceRequests.map(async (time) => {
      const priceResponse = await getPriceFromCloud(symbol, time)
      return {
        time,
        value: priceResponse.close,
      }
    }),
  )
  await db.price.createMany({
    data: newPrices.map((price) => {
      return {
        symbol,
        value: price.value,
        time: price.time.unix(),
        currency: Currency.USD,
      }
    }),
  })

  newPrices.forEach((price) => {
    priceMap[price.time.unix()] = price.value
  })
  const filteredPriceMap: Record<number, number> = {}
  Object.entries(priceMap).forEach(([ts, value]) => {
    if (value > 0 && Number(ts) >= req.begin && Number(ts) <= req.end) {
      filteredPriceMap[ts] = value
    }
  })
  return { prices: filteredPriceMap }
}
