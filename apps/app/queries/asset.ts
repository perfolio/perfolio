import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { GetAssetRequest } from "@perfolio/api/feature/lambda"
import { Asset } from "@perfolio/data-access/db"
import { useSession } from "next-auth/client"

export const QUERY_KEY_ASSET_BY_ISIN = (isin: string): string => `asset_by_${isin}`
export function useAsset(req: GetAssetRequest) {
  const [session] = useSession()
  const api = useApi()

  const { data, ...meta } = useQuery<Asset, Error>(
    QUERY_KEY_ASSET_BY_ISIN(req.isin),
    async () => api.assets.getAsset(req),
    {
      enabled: !!session && !!req.isin,
    },
  )
  return { asset: data, ...meta }
}
