import { z } from "zod"
import { getFigiMapping } from "@perfolio/integrations/iexcloud"
import { IEXCache, Key } from "@perfolio/integrations/redis"
export const getTickerFromFigiRequestValidation = z.object({
  figi: z.string(),
})

export type GetTickerFromFigiRequest = z.infer<typeof getTickerFromFigiRequestValidation>
export type GetTickerFromFigiResponse = { symbol: string; region: string; exchange: string } | null
export async function getTickerFromFigi({
  figi,
}: GetTickerFromFigiRequest): Promise<GetTickerFromFigiResponse> {
  const key = new Key({ query: "getTickerFromFigi", figi })
  const cache = new IEXCache()

  const cachedData = await cache.get<GetTickerFromFigiResponse>(key)
  if (cachedData) {
    return cachedData
  }

  const freshData = await getFigiMapping(figi)

  const value = freshData.length > 0 ? freshData[0] : null
  cache.set("30d", { key, value })
  return value
}
