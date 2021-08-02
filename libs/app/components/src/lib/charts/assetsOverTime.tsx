import React, { useMemo } from "react"
import { AreaChart } from "@perfolio/ui/charts"
import { useAbsolutePortfolioHistory, useRelativePortfolioHistory } from "@perfolio/hooks"
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
  const { absolutePortfolioHistory } = useAbsolutePortfolioHistory()
  const { relativePortfolioHistory } = useRelativePortfolioHistory()

  console.log(range, Time.fromTimestamp(range).toDate().toLocaleDateString())
  const data = useMemo(() => {
    const choice =
      aggregate === "Absolute"
        ? absolutePortfolioHistory
        : (relativePortfolioHistory as { time: number; value: number }[])
    console.log({ choice })

    const selected = choice.filter(({ time }) => time >= range)

    const downsampled = Downsampling.largestTriangle(
      selected.map(({ time, value }) => ({ x: time, y: value })),
      500,
    )
    console.log({ downsampled })
    return downsampled.map(({ x, y }) => ({
      time: Time.fromTimestamp(x).toDate().toLocaleDateString(),
      value: y,
    }))
  }, [absolutePortfolioHistory, relativePortfolioHistory, aggregate, range])
  console.log({ data })
  return (
    <div className="w-full h-56">
      <AreaChart
        isLoading={data.length === 0}
        data={data}
        withXAxis
        tooltip={(n) => format(n, { suffix: aggregate === "Absolute" ? "€" : undefined })}
      />
    </div>
  )
}
