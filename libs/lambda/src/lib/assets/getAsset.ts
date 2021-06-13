import { db, Asset } from "@perfolio/db"
import { z } from "zod"
import { getIsinMapping, getVolumeByVenue } from "@perfolio/iexcloud"

export const GetAssetRequestValidation = z.object({
  isin: z.string(),
})

export type GetAssetRequest = z.infer<typeof GetAssetRequestValidation>
export type GetAssetResponse = Asset
export async function getAsset({ isin }: GetAssetRequest): Promise<GetAssetResponse> {
  const asset = await db().asset.fromIsin(isin)
  if (asset) {
    return asset
  }

  const possibleAssets = await getIsinMapping(isin)
  /**
   * If there is a asset with neither a country prefix (`US_`) or exchange suffix (`-ch`)
   * we could assume that's the main one.
   */
  const quickFind = possibleAssets.find(
    (asset) => !asset.symbol.includes("_") && !asset.symbol.includes("-"),
  )
  if (quickFind) {
    return db().asset.create({
      symbol: quickFind.symbol,
      isin,
    })
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
  return db().asset.create({
    symbol: bestAsset.symbol,
    isin: isin,
  })
}
