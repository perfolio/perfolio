import {useAuth} from "@perfolio/pkg/auth"

import { AssetHistoryQuery } from "@perfolio/pkg/api"
import { useQuery } from "react-query"
import { client } from "../client"

export const useAssetHistory = (opts: {
  assetId?: string
  mic?: string
  start?: number
  end?: number
}) => {
  const { getAccessToken } = useAuth()
  const { data, ...meta } = useQuery<AssetHistoryQuery, Error>(
    ["ASSET", opts.assetId, "HISTORY", opts],
    async () =>
      client(
        await getAccessToken(),
      ).assetHistory({
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
