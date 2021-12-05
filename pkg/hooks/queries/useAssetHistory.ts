import { useAuth0 } from "@auth0/auth0-react"
import { AssetHistoryQuery } from "@perfolio/pkg/api"
import { useQuery } from "react-query"
import { client } from "../client"

export const useAssetHistory = (opts: {
  assetId?: string
  mic?: string
  start?: number
  end?: number
}) => {
  const { getAccessTokenSilently } = useAuth0()
  const { data, ...meta } = useQuery<AssetHistoryQuery, Error>(
    ["ASSET", opts.assetId, "HISTORY", opts],
    async () =>
      client(await getAccessTokenSilently()).assetHistory({
        assetId: opts.assetId!,
        mic: opts.mic!,
        ...opts,
      }),
    {
      enabled: !!opts.assetId && !!opts.mic,
    },
  )

  return {
    assetHistory: data?.exchangeTradedAsset?.assetHistory,
    ...meta,
  }
}
