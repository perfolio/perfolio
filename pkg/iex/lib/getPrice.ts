import { Currency, Price } from ".prisma/client"
import db from "db"
import { getPrice as getPriceFromCloud } from "integrations/iexcloud"
import { NotFoundError } from "blitz"
import * as z from "zod"
import { Time } from "pkg/time"

export const GetPriceRequestValidation = z.object({
  symbol: z.string(),
  time: z.number().int(),
})

export type GetPriceRequest = z.infer<typeof GetPriceRequestValidation>

export type GetPriceResponse = {
  price: Price
}

export async function getPrice(
  req: GetPriceRequest,
): Promise<GetPriceResponse> {
  let symbol = req.symbol.toLowerCase()
  if (symbol.includes("_")) {
    symbol = symbol.split("_")[1]!
  }
  if (symbol.includes("-")) {
    symbol = symbol.split("-")[0]!
  }

  let price = await db.price.findUnique({
    where: {
      symbol_time_currency: {
        symbol,
        time: req.time,
        currency: Currency.USD,
      },
    },
  })

  if (!price) {
    const res = await getPriceFromCloud(symbol, Time.fromTimestamp(req.time))
    if (res.length < 1) {
      throw new NotFoundError()
    }

    price = await db.price.create({
      data: {
        symbol,
        time: req.time,
        value: res[0]!.close,
      },
    })
  }

  return { price }
}
