import { z } from "zod"
import { getFigiMapping, getVolumeByVenue } from "@perfolio/data-access/iexcloud"
import { Cache, Key } from "@perfolio/data-access/cache"
export const GetSymbolFromFigiRequestValidation = z.object({
  figi: z.string(),
})

export type GetSymbolFromFigiRequest = z.infer<typeof GetSymbolFromFigiRequestValidation>
export type GetSymbolFromFigiResponse = { symbol: string }
export async function getSymbolFromFigi({
  figi,
}: GetSymbolFromFigiRequest): Promise<GetSymbolFromFigiResponse> {
  const key = new Key("getSymbolFromFigi", { figi })

  let asset = await Cache.get<{ symbol: string }>(key)
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
      symbol: quickFind.symbol,
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
          symbol: asset.symbol,
        }
      }),
    )
  ).sort((a, b) => b.volume - a.volume)[0]

  asset = {
    symbol: bestAsset.symbol,
  }
  Cache.set(key, asset, 30)
  return asset
}
