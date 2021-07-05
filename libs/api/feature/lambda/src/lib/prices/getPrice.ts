import { Time } from "@perfolio/util/time"
import { z } from "zod"
import { getPrice as getPriceFromCloud } from "@perfolio/integrations/iexcloud"
import { Key, Cache } from "@perfolio/integrations/redis"
import { Price } from "@perfolio/types"
export const GetPriceRequestValidation = z.object({
  ticker: z.string(),
  time: z.number().int(),
})

export type GetPriceRequest = z.infer<typeof GetPriceRequestValidation>
export type GetPriceResponse = Price
export async function getPrice({ ticker, time }: GetPriceRequest): Promise<GetPriceResponse> {
  const key = new Key("getPrice", { ticker, time })

  let price = await Cache.get<Price>(key)
  if (price) {
    return price
  }
  const newPrice = await getPriceFromCloud(ticker, Time.fromTimestamp(time))

  price = { ticker, time, value: newPrice.close }

  await Cache.set(key, price, 7 * 24 * 60 * 60)

  return price
}
