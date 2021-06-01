import { resolver } from "blitz"
import { getPrice } from "integrations/iexcloud"
import { Time } from "pkg/time"
import * as z from "zod"

const GetStockPrice = z.object({
  symbol: z.string(),
  time: z.number().int(),
})

export default resolver.pipe(
  resolver.zod(GetStockPrice),
  resolver.authorize(),
  async ({ symbol, time }) => {
    const price = await getPrice(symbol, Time.fromTimestamp(time))

    return price[0]?.close
  },
)
