import { Time } from "@perfolio/util/time"
import { AssetsOverTime } from "./types"
import { rebalance } from "./rebalance"
import { AssetHistory } from "@perfolio/api/graphql"

/**
 * Transform AssetsOverTime into a format readable by recharts.
 */
export const plotAbsolute = (history: AssetsOverTime): { time: string; value: number }[] => {
  return Object.entries(history).map(([time, assets]) => {
    return {
      time: Time.fromTimestamp(Number(time)).toDate().toLocaleDateString(),
      value: Object.values(assets)
        .map((asset) => asset.quantity * asset.value)
        .reduce((acc, val) => acc + val),
    }
  })
}

/**
 * Build an index and transform data to be readable by recharts
 */
export const plotRelative = (history: AssetHistory): { time: string; value: number }[] => {
  const timeline = toTimeseries([history])
  const index = rebalance(timeline)
  const data = Object.entries(index).map(([time, value]) => {
    return {
      time: Time.fromTimestamp(Number(time)).toDate().toLocaleDateString(),
      value,
    }
  })
  return data
}

/**
 * Transform AssetHistory to AssetsOverTime
 *
 * Sorting by time first, then assetId
 */
export const toTimeseries = (assetHistory: AssetHistory[]): AssetsOverTime => {
  const timeline: AssetsOverTime = {}
  assetHistory.forEach(({ asset, history }) => {
    ;[...history]
      .sort((a, b) => a.time - b.time)
      .forEach((day) => {
        if (day.value > 0) {
          if (!timeline[day.time]) {
            timeline[day.time] = {}
          }

          timeline[day.time][asset.id] = { value: day.value, quantity: day.quantity }
        }
      })
  })
  return timeline
}
