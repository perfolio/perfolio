import { z } from "zod"
import { getFigiMapping, getVolumeByVenue } from "@perfolio/integrations/iexcloud"
import { Cache, Key } from "@perfolio/integrations/redis"
export const GetSymbolFromFigiRequestValidation = z.object({
  figi: z.string(),
})

export type GetSymbolFromFigiRequest = z.infer<typeof GetSymbolFromFigiRequestValidation>
export type GetSymbolFromFigiResponse = { ticker: string }
export async function getSymbolFromFigi({
  figi,
}: GetSymbolFromFigiRequest): Promise<GetSymbolFromFigiResponse> {
  const key = new Key("getSymbolFromFigi", { figi })

  let asset = await Cache.get<{ ticker: string }>(key)
  if (asset) {
    return asset
  }

  const possibleAssets = await getFigiMapping(figi)
  console.warn({ key, possibleAssets, figi })
  /**
   * If there is a asset with neither a country prefix (`US_`) or exchange suffix (`-ch`)
   * we could assume that's the main one.
   */
  const quickFind = possibleAssets.find(
    (asset) => !asset.symbol.includes("_") && !asset.symbol.includes("-"),
  )
  if (quickFind) {
    asset = {
      ticker: quickFind.symbol,
    }
    Cache.set(key, asset, 30)
    return asset
  }

  /**
   * Search biggest venue for each asset
   */
  const bestAsset = (
    await Promise.all(
      possibleAssets.map(async (asset) => {
        const venues = await getVolumeByVenue(asset.symbol)
        return {
          volume: venues.sort((a, b) => b.volume - a.volume)[0].volume,
          ticker: asset.symbol,
        }
      }),
    )
  ).sort((a, b) => b.volume - a.volume)[0]

  asset = {
    ticker: bestAsset.ticker,
  }
  Cache.set(key, asset, 30)
  return asset
}
