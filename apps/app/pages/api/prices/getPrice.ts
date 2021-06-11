import { withMiddleware } from "@perfolio/api"

import { db } from "@perfolio/db"
import { z } from "zod"
import { getPrice } from "@perfolio/iexcloud"
import { Time } from "@perfolio/time"

export const GetPriceRequestValidation = z.object({
  symbol: z.string(),
  time: z.number().int(),
})

export type GetPriceRequest = z.infer<typeof GetPriceRequestValidation>

async function getPriceApiHandler({ symbol, time }: GetPriceRequest) {
  const t = Time.fromTimestamp(time)
  const price = await db().price.fromSymbolAndTime(symbol, t)
  if (price) {
    return price
  }

  const newPrice = await getPrice(symbol, t)
  return db().price.create({
    symbol,
    time,
    value: newPrice.close,
  })
}

export default withMiddleware(getPriceApiHandler, GetPriceRequestValidation)
