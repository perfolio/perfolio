import { z } from "zod"
import { search as openfigiSearch } from "@perfolio/integrations/openfigi"
import { Cache, Key } from "@perfolio/integrations/redis"
import { getTickerFromFigi } from "../assets/getTickerFromFigi"

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
  const key = new Key("search5", { fragment })

  const cachedData = await Cache.get<SearchResponse>(key)
  if (cachedData) {
    return cachedData
  }

  const figis = await openfigiSearch({ fragment, currency, exchange })
  const symbols = (
    await Promise.all(
      figis.map(async (figi) => {
        const symbol = await getTickerFromFigi({ figi })
        return {
          symbol: symbol?.symbol,
          figi,
        }
      }),
    )
  ).filter((s) => !!s.symbol)

  await Cache.set("1d", { key, value: symbols })
  return symbols as { figi: string; symbol: string }[]
}
