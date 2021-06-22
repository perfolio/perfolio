import { Time } from "@perfolio/feature/time"
import { z } from "zod"
import { getPrice as getPriceFromCloud } from "@perfolio/data-access/iexcloud"
import { Key, Cache } from "@perfolio/data-access/cache"
import { Price } from "@perfolio/types"
export const GetPriceRequestValidation = z.object({
  symbol: z.string(),
  time: z.number().int(),
})

export type GetPriceRequest = z.infer<typeof GetPriceRequestValidation>
export type GetPriceResponse = Price
export async function getPrice({ symbol, time }: GetPriceRequest): Promise<GetPriceResponse> {
  const key = new Key("getPrice", { symbol, time })

  let price = await Cache.get<Price>(key)
  if (price) {
    return price
  }
  const newPrice = await getPriceFromCloud(symbol, Time.fromTimestamp(time))

  price = { symbol, time, value: newPrice.close }

  await Cache.set(key, price, 7 * 24 * 60 * 60)

  return price
}
