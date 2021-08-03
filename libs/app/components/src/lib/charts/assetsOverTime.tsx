import React, { useMemo } from "react"
import { AreaChart } from "@perfolio/ui/charts"
import {
  useAbsolutePortfolioHistory,
  usePortfolioHistory,
  useRelativePortfolioHistory,
} from "@perfolio/hooks"
import { format } from "@perfolio/util/numbers"
import { Downsampling } from "@perfolio/downsampling"
import { Time } from "@perfolio/util/time"
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
  const { portfolioHistory } = usePortfolioHistory()
  const { absolutePortfolioHistory, isLoading: absoluteLoading } = useAbsolutePortfolioHistory(
    portfolioHistory,
    range,
  )
  const { relativePortfolioHistory, isLoading: relativeLoading } =
    useRelativePortfolioHistory(range)

  const data = useMemo(() => {
    const choice =
      aggregate === "Absolute"
        ? absolutePortfolioHistory
        : (relativePortfolioHistory as { time: number; value: number }[])

    const downsampled = Downsampling.largestTriangle(
      choice.map(({ time, value }) => ({ x: time, y: value })),
      500,
    )
    return downsampled.map(({ x, y }) => ({
      time: Time.fromTimestamp(x).toDate().toLocaleDateString(),
      value: y,
    }))
  }, [absolutePortfolioHistory, relativePortfolioHistory, aggregate])
  return (
    <div className="w-full h-56">
      <AreaChart
        isLoading={absoluteLoading || relativeLoading}
        data={data}
        withXAxis
        tooltip={(n) => format(n, { suffix: aggregate === "Absolute" ? "€" : undefined })}
      />
    </div>
  )
}
