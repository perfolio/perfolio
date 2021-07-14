import { getExchanges as getExchangesFromCloud } from "@perfolio/integrations/iexcloud"
import { IEXCache, Key } from "@perfolio/integrations/redis"
import { Exchange } from "@perfolio/types"

export type GetExchangesResponse = Exchange[]

export async function getExchanges(): Promise<GetExchangesResponse> {
  const key = new Key({ query: "getExchanges" })
  const cache = new IEXCache()

  let exchanges = await cache.get<GetExchangesResponse>(key)
  if (exchanges) {
    return exchanges
  }

  exchanges = await getExchangesFromCloud()

  await cache.set("1d", { key, value: exchanges })
  return exchanges
}
