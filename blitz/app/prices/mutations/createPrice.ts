import { resolver } from "blitz"
import { db, Price } from "db"

export default resolver.pipe(
  resolver.zod(Price.schema),
  resolver.authorize(),
  async (price) => {
    return db.price.create(price)
  },
)
