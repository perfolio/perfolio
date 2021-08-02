import { useQuery } from "react-query"
import { usePortfolioHistory } from "./usePortfolioHistory"
export const USE_COMBINED_ASSET_HISTORY = "USE_COMBINED_ASSET_HISTORY"
import { AssetsOverTime, toTimeseries, rebalance } from "@perfolio/feature/finance/returns"
import { Time } from "@perfolio/util/time"
import { Downsampling } from "@perfolio/downsampling"

type Data = {
  x: number
  y: number
}[]
const plotAbsolute = (timeline: AssetsOverTime): Data => {
  return Object.entries(timeline).map(([time, assets]) => {
    return {
      x: Time.fromTimestamp(Number(time)).unix(),
      y: Object.values(assets)
        .map((asset) => asset.quantity * asset.value)
        .reduce((acc, val) => acc + val),
    }
  })
}

const plotRelative = (timeline: AssetsOverTime): Data => {
  const index = rebalance(timeline)
  const data = Object.entries(index).map(([time, y]) => {
    return {
      x: Time.fromTimestamp(Number(time)).unix(),
      y,
    }
  })
  return data
}

export const useCombinedAssetHistory = ({
  aggregate,
  range,
  maxDatapoints,
}: {
  aggregate: "Absolute" | "Relative"
  range: number
  maxDatapoints: number
}) => {
  const { portfolioHistory, ...meta } = usePortfolioHistory()
  const { data } = useQuery(
    [USE_COMBINED_ASSET_HISTORY, { aggregate, range, maxDatapoints }],
    () => {
      const series = toTimeseries(portfolioHistory)
      const selectedHistory: AssetsOverTime = {}
      Object.keys(series).forEach((time) => {
        if (Number(time) * 1000 >= range) {
          selectedHistory[Number(time)] = series[Number(time)]
        }
      })
      const aggregatedData =
        aggregate === "Absolute" ? plotAbsolute(selectedHistory) : plotRelative(selectedHistory)
      const downsampled = Downsampling.largestTriangle(aggregatedData, maxDatapoints)

      return downsampled.map(({ x, y }) => ({
        time: Time.fromTimestamp(x).toDate().toLocaleDateString(),
        value: y,
      }))
    },
  )

  return { combinedAssetHistory: data ?? [], ...meta }
}
