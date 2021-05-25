import { resolver, NotFoundError } from "blitz"
import db from "db"
import { Cloud } from "integrations/iexcloud"
import { Time } from "pkg/time"
import * as z from "zod"

const GetCurrentPrice = z.object({
  isin: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetCurrentPrice),
  resolver.authorize(),
  async ({ isin }) => {
    const cloud = new Cloud()

    const price = await cloud.getCurrentPrice({ isin }).catch((err) => {
      throw new Error(`Unable to load latest price from cloud: ${err}`)
    })

    if (!price) throw new NotFoundError()

    return price
  },
)
