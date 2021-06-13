import { Time } from "@perfolio/time"
import { z } from "zod"
import { db, Price } from "@perfolio/db"
import { getPrice as getPriceFromCloud } from "@perfolio/iexcloud"

export const GetPriceRequestValidation = z.object({
  symbol: z.string(),
  time: z.number().int(),
})

export type GetPriceRequest = z.infer<typeof GetPriceRequestValidation>
export type GetPriceResponse = Price
export async function getPrice({ symbol, time }: GetPriceRequest): Promise<GetPriceResponse> {
  const t = Time.fromTimestamp(time)
  const price = await db().price.fromSymbolAndTime(symbol, t)
  if (price) {
    return price
  }

  const newPrice = await getPriceFromCloud(symbol, t)
  return db().price.create({
    symbol,
    time,
    value: newPrice.close,
  })
}
