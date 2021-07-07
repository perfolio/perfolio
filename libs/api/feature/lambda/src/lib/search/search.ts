import { z } from "zod"
import { search as openfigiSearch } from "@perfolio/integrations/openfigi"
import { Cache, Key } from "@perfolio/integrations/redis"
import { getFigiMapping } from "@perfolio/integrations/iexcloud"

export const SearchRequestValidation = z.object({
  fragment: z.string(),
  currency: z.string().optional(),
  exchange: z.string().optional(),
})

export type SearchRequest = z.infer<typeof SearchRequestValidation>
export type SearchResponse = { symbol: string; region: string; exchange: string }[]
export async function search(req: SearchRequest): Promise<SearchResponse> {
  const key = new Key("search", { fragment: req.fragment })

  // const cachedData = await Cache.get<SearchResponse>(key)
  // if (cachedData) {
  //   return cachedData
  // }

  const figis = await openfigiSearch(req)
  console.log({ figis })
  const symbols = await getFigiMapping(...figis)

  console.log({ symbols })
  await Cache.set(key, symbols, 60 * 60 * 24) // 24h
  return symbols
}
