import { Downsampling } from "@perfolio/pkg/downsampling"
import { useAbsoluteTotalHistory, usePortfolioHistory } from "@perfolio/pkg/hooks"
import { format } from "@perfolio/pkg/util/numbers"
import { Time } from "@perfolio/pkg/util/time"
import { AreaChart } from "@perfolio/ui/charts"
import React, { useMemo } from "react"
export type AggregateOptions = "relative" | "absolute"

export interface AssetsOverTimeChartProps {
  /**
   * Time in seconds from the first datapoint til now.
   */
  since: number

  aggregate: AggregateOptions
}

export const AssetsOverTimeChart: React.FC<AssetsOverTimeChartProps> = ({
  aggregate = "absolute",
  since,
}): JSX.Element => {
  const { history, isLoading } = usePortfolioHistory({ since })
  const { absoluteTotal } = useAbsoluteTotalHistory({ since })

  const data = useMemo(() => {
    const choice = aggregate === "absolute" ? absoluteTotal : history.relative

    const downsampled = Downsampling.largestTriangle(
      choice.map(({ time, value }) => ({ x: time, y: value })),
      500,
    )
    return downsampled.map(({ x, y }) => ({
      time: Time.fromTimestamp(x).toDate().toLocaleDateString(),
      value: y,
    }))
  }, [absoluteTotal, history, aggregate])
  return (
    <div className="w-full h-56">
      <AreaChart
        isLoading={isLoading}
        data={data}
        withXAxis
        tooltip={(n) => format(n, { suffix: aggregate === "absolute" ? "€" : undefined })}
      />
    </div>
  )
}
