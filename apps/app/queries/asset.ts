import { Api } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { GetAssetRequest } from "@perfolio/lambda"
import { Asset } from "@perfolio/db"
import { useSession } from "next-auth/client"

export const QUERY_KEY_ASSET_BY_ISIN = (isin: string): string => `asset_by_${isin}`
export function useAsset(req: GetAssetRequest) {
  const [session] = useSession()
  const { data, ...meta } = useQuery<Asset, Error>(
    QUERY_KEY_ASSET_BY_ISIN(req.isin),
    async () => new Api().assets.getAsset(req),
    {
      enabled: !!session && !!req.isin,
    },
  )
  return { asset: data, ...meta }
}
