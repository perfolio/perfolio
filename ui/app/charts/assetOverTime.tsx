import { Downsampling } from "@perfolio/pkg/downsampling"
import { useAssetHistory } from "@perfolio/pkg/hooks"
import { format } from "@perfolio/pkg/util/numbers"
import { Time } from "@perfolio/pkg/util/time"
import { AreaChart } from "@perfolio/ui/charts"
import React, { useMemo } from "react"

export interface AssetOverTimeProps {
  assetId?: string
  mic?: string
  start?: number
  end?: number
}

export const AssetOverTime: React.FC<AssetOverTimeProps> = ({
  assetId,
  mic,
  start,
  end,
}): JSX.Element => {
  const { assetHistory, isLoading } = useAssetHistory({
    assetId,
    mic,
    start,
    end,
  })

  const data = useMemo(() => {
    const downsampled = Downsampling.largestTriangle(
      (assetHistory ?? []).map(({ time, value }) => ({ x: time, y: value })),
      500,
    )
    return downsampled.map(({ x, y }) => ({
      time: Time.fromTimestamp(x).toDate().toLocaleDateString(),
      value: y,
    }))
  }, [assetHistory])
  return (
    <div className="w-full h-56">
      <AreaChart
        isLoading={isLoading}
        data={data}
        withXAxis
        tooltip={(n) => format(n, { suffix: "€" })}
      />
    </div>
  )
}
