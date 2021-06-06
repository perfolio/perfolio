import { resolver } from "blitz"
import { z } from "zod"
import { getPrice } from "integrations/iexcloud"
import { Time } from "app/time"
const GetPrice = z.object({
  symbol: z.string(),
  time: z.object({
    year: z.number().int(),
    month: z.number().int(),
    day: z.number().int(),
  }),
})

export default resolver.pipe(
  resolver.zod(GetPrice),
  resolver.authorize(),
  async ({ symbol, time }) => {
    return getPrice(symbol, new Time(time.year, time.month, time.day))
  },
)
