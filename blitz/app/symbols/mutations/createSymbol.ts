import { resolver } from "blitz"
import { db, Symbol } from "db"
export default resolver.pipe(
  resolver.zod(Symbol.schema),
  resolver.authorize(),
  async ({ symbol, isin }) => {
    return db.symbol.create({ symbol, isin })
  },
)
