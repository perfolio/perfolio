import { request } from "@perfolio/api"
import { useQuery } from "react-query"
import { GetAssetRequest, GetAssetRequestValidation } from "../pages/api/assets/getAsset"
import { Asset } from "@perfolio/db"
import { useAuth } from "@perfolio/auth"

export function useAsset(req: GetAssetRequest) {
  const { getToken } = useAuth()
  const token = getToken()
  const { data, ...meta } = useQuery<Asset, Error>(
    `asset_by_${req.isin}`,
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
