import { resolver, NotFoundError } from "blitz"
import { Cloud } from "integrations/iexcloud"
import db from "db"
import * as z from "zod"

const GetPossibleSymbols = z.object({
  isin: z.string().regex(/[A-Z]{2}[a-zA-Z0-9]{10}/),
})
export default resolver.pipe(
  resolver.zod(GetPossibleSymbols),
  resolver.authorize(),
  async ({ isin }) => {
    const api = new Cloud()
    const possibleSymbols = await api.getPossibleSymbols({ isin })
    return possibleSymbols
  },
)
