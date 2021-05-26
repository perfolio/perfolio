import { resolver, NotFoundError } from "blitz"
import db from "db"
import { Cloud } from "integrations/iexcloud"
import { Time } from "pkg/time"
import * as z from "zod"

const GetStockPrice = z.object({
  isin: z.string(),
  time: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetStockPrice),
  resolver.authorize(),
  async ({ isin, time }) => {
    const cloud = new Cloud()

    let price = await db.price
      .findUnique({
        where: { isin_time: { isin: isin.toLowerCase(), time } },
      })
      .catch((err) => {
        console.error("ERR:", err)
      })
    if (price) {
      return price
    }

    const newPrice = await cloud.getPrice({ isin, time: Time.fromTimestamp(time) }).catch((err) => {
      throw new Error(`Unable to load closing price from cloud: ${err}`)
    })
    price = await db.price
      .upsert({
        where: {
          isin_time: { isin, time },
        },
        create: {
          isin,
          time,
          value: newPrice.value,
        },
        update: { value: newPrice.value },
      })
      .catch((err: Error) => {
        throw new Error(`Unable to store price for ${isin}@${time} in database: ${err}`)
      })

    if (!price) throw new NotFoundError()

    return price
  },
)
