import { getExchanges as getExchangesFromCloud } from "@perfolio/integrations/iexcloud"
import { Cache, Key } from "@perfolio/integrations/redis"
import { Exchange } from "@perfolio/types"

export type GetExchangesResponse = Exchange[]

export async function getExchanges(): Promise<GetExchangesResponse> {
  const key = new Key("getExchanges")

  let exchanges = await Cache.get<GetExchangesResponse>(key)
  if (exchanges) {
    return exchanges
  }

  exchanges = await getExchangesFromCloud()

  await Cache.set(key, exchanges, 30 * 24 * 60 * 60) // 30 days
  return exchanges
}
