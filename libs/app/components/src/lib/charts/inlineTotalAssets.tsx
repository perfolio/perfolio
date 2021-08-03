import React, { useMemo } from "react"
import { AreaChart } from "@perfolio/ui/charts"
import { useAbsolutePortfolioHistory, usePortfolioHistory } from "@perfolio/hooks"
import { format } from "@perfolio/util/numbers"
import { useCurrentAbsoluteValue } from "@perfolio/hooks"
import { Downsampling } from "@perfolio/downsampling"
import { Time } from "@perfolio/util/time"
export const InlineTotalAssetChart: React.FC = (): JSX.Element => {
  const { portfolioHistory } = usePortfolioHistory()
  const { absolutePortfolioHistory, isLoading } = useAbsolutePortfolioHistory(portfolioHistory)
  const { currentAbsoluteValue } = useCurrentAbsoluteValue()
  const data = useMemo(() => {
    const downsampled = Downsampling.largestTriangle(
      absolutePortfolioHistory.map(({ time, value }) => ({ x: time, y: value })),
      500,
    )
    return downsampled.map(({ x, y }) => ({
      time: Time.fromTimestamp(x).toDate().toLocaleDateString(),
      value: y,
    }))
  }, [absolutePortfolioHistory])
  return (
    <div className="flex-col justify-center hidden w-full h-20 space-y-8 bg-gray-100 rounded xl:flex">
      <div className="relative w-full h-full">
        <AreaChart isLoading={isLoading} data={data} />
        <div className="absolute top-0 left-0 p-4">
          <span className="p-1 text-lg font-semibold text-black bg-gray-100 bg-opacity-75 rounded">
            {format(currentAbsoluteValue, { suffix: "€" })}
          </span>
        </div>
      </div>
    </div>
  )
}
