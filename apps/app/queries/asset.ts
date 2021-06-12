import { request } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { GetAssetRequest, GetAssetRequestValidation } from "../pages/api/assets/getAsset"
import { Asset } from "@perfolio/db"
import { useAuth } from "@perfolio/auth"

export const QUERY_KEY_ASSET_BY_ISIN = (isin: string): string => `asset_by_${isin}`
export function useAsset(req: GetAssetRequest) {
  const { getToken } = useAuth()
  const token = getToken()
  const { data, ...meta } = useQuery<Asset, Error>(
    QUERY_KEY_ASSET_BY_ISIN(req.isin),
    async () => {
      return await request<Asset>({
        token,
        path: "/api/assets/getAsset",
        body: GetAssetRequestValidation.parse(req),
      })
    },
    {
      enabled: !!token && !!req.isin,
    },
  )
  return { asset: data, ...meta }
}
