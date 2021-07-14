import { Time } from "@perfolio/util/time"
import { z } from "zod"
import { getPrice as getPriceFromCloud } from "@perfolio/integrations/iexcloud"
import { Key, IEXCache } from "@perfolio/integrations/redis"
import { Price } from "@perfolio/types"
export const GetPriceRequestValidation = z.object({
  ticker: z.string(),
  time: z.number().int(),
})

export type GetPriceRequest = z.infer<typeof GetPriceRequestValidation>
export type GetPriceResponse = Price
export async function getPrice({ ticker, time }: GetPriceRequest): Promise<GetPriceResponse> {
  const key = new Key({ query: "getPrice", ticker, time })
  const cache = new IEXCache()

  let price = await cache.get<Price>(key)
  if (price) {
    return price
  }
  const newPrice = await getPriceFromCloud(ticker, Time.fromTimestamp(time))

  price = { ticker, time, value: newPrice.close }

  await cache.set("1d", { key, value: price })

  return price
}
