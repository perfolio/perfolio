import { z } from "zod"
import { search as openfigiSearch } from "@perfolio/integrations/openfigi"
import { Cache, Key } from "@perfolio/integrations/redis"
import { getTickerFromFigi } from "../assets/getTickerFromFigi"
import { Logger } from "tslog"

export const SearchRequestValidation = z.object({
  fragment: z.string(),
  currency: z.string().optional(),
  exchange: z.string().optional(),
})

export type SearchRequest = z.infer<typeof SearchRequestValidation>
export type SearchResponse = { symbol: string; figi: string }[]
export async function search({
  fragment,
  currency,
  exchange,
}: SearchRequest): Promise<SearchResponse> {
  fragment = fragment.toLowerCase()
  const log = new Logger({ prefix: [`[ ${fragment} ]`] })
  const key = new Key("search", { fragment })

  const cachedData = await Cache.get<SearchResponse>(key)
  if (cachedData) {
    log.info("Returning cached data", cachedData)
    return cachedData
  }

  const figis = await openfigiSearch({ fragment, currency, exchange })
  log.info("Found new figis", figis)
  const symbols = (
    await Promise.all(
      figis.map(async (figi) => {
        const symbol = await getTickerFromFigi({ figi })
        log.info("Found symbol for figi", { figi }, { symbol })
        return {
          symbol: symbol?.symbol,
          figi,
        }
      }),
    )
  ).filter((s) => !!s.symbol)

  await Cache.set("1d", { key, value: symbols })
  log.info("Retruning symbols", symbols)
  return symbols as { figi: string; symbol: string }[]
}
