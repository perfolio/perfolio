import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
} from "../../../../lib"
import { Time } from "@perfolio/time"
import { z } from "zod"
import { db } from "@perfolio/db"
import { getPrice as getPriceFromCloud } from "@perfolio/iexcloud"

export const GetPriceRequestValidation = z.object({
  symbol: z.string(),
  time: z.number().int(),
})

export type GetPriceRequest = z.infer<typeof GetPriceRequestValidation>

export async function getPrice({ symbol, time }: GetPriceRequest) {
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

export default use(getPrice, [
  withPreflightChecks,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])
