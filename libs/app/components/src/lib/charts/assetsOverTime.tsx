import React, { useMemo } from "react"
import { AreaChart } from "@perfolio/ui/charts"
import { Time } from "@perfolio/util/time"
import { AssetsOverTime, toTimeseries, rebalance } from "@perfolio/feature/finance/returns"
import { usePortfolioHistory } from "@perfolio/hooks"
import { format } from "@perfolio/util/numbers"

type Data = {
  time: string
  value: number
}[]

const plotAbsolute = (timeline: AssetsOverTime): Data => {
  return Object.entries(timeline).map(([time, assets]) => {
    return {
      time: Time.fromTimestamp(Number(time)).toDate().toLocaleDateString(),
      value: Object.values(assets)
        .map((asset) => asset.quantity * asset.value)
        .reduce((acc, val) => acc + val),
    }
  })
}

const plotRelative = (timeline: AssetsOverTime): Data => {
  const index = rebalance(timeline)
  const data = Object.entries(index).map(([time, value]) => {
    return {
      time: Time.fromTimestamp(Number(time)).toDate().toLocaleDateString(),
      value,
    }
  })
  return data
}

export type AggregateOptions = "Relative" | "Absolute"

export interface AssetsOverTimeChartProps {
  /**
   * Time in seconds from the first datapoint til now.
   */
  range: number

  aggregate: AggregateOptions
}

export const AssetsOverTimeChart: React.FC<AssetsOverTimeChartProps> = ({
  aggregate = "Absolute",
  range,
}): JSX.Element => {
  const { portfolioHistory, isLoading } = usePortfolioHistory()
  /**
   * Filter by range and return either absolute or relative history
   */
  const data = useMemo<Data>(() => {
    if (!portfolioHistory) {
      return []
    }
    const series = toTimeseries(portfolioHistory)
    const selectedHistory: AssetsOverTime = {}
    Object.keys(series).forEach((time) => {
      if (Number(time) * 1000 >= range) {
        selectedHistory[Number(time)] = series[Number(time)]
      }
    })

    return aggregate === "Absolute" ? plotAbsolute(selectedHistory) : plotRelative(selectedHistory)
  }, [aggregate, portfolioHistory, range])

  return (
    <div className="w-full h-56">
      <AreaChart
        isLoading={isLoading}
        data={data}
        withXAxis
        tooltip={(n) => format(n, { suffix: aggregate === "Absolute" ? "€" : undefined })}
      />
    </div>
  )
}
