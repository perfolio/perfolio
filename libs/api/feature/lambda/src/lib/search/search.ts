import { z } from "zod"
import { search as openfigiSearch } from "@perfolio/integrations/openfigi"
import { Cache, Key } from "@perfolio/integrations/redis"
import { getSymbolFromFigi } from "../assets/getSymbolFromFigi"
export const SearchRequestValidation = z.object({
  fragment: z.string(),
  currency: z.string().optional(),
})

export type SearchRequest = z.infer<typeof SearchRequestValidation>
export type SearchResponse = {
  figi: string
  name?: string
  ticker?: string
  exchange?: string
}[]
export async function search({ fragment, currency }: SearchRequest): Promise<SearchResponse> {
  const key = new Key("api.openfigi.com/v3/search", { fragment })

  const cachedData = await Cache.get<SearchResponse>(key)
  if (cachedData) {
    return cachedData
  }

  const freshData = await openfigiSearch({ fragment, currency })

  const symbols = await Promise.all(freshData.map((d) => getSymbolFromFigi({ figi: d.figi })))
  console.log({ symbols })

  const searchResponse: SearchResponse = freshData.map((d) => {
    return {
      figi: d.figi,
      name: d.name ?? undefined,
      ticker: d.ticker ?? undefined,
      exchange: d.exchCode ?? undefined,
    }
  })
  await Cache.set(key, searchResponse, 60 * 60 * 24) // 24h
  return searchResponse
}
