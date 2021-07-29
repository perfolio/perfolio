import React from "react"
import { AreaChart } from "@perfolio/ui/charts"
import { usePortfolioHistory } from "@perfolio/hooks"
import { Time } from "@perfolio/util/time"
import { format } from "@perfolio/util/numbers"
import { useCurrentValue } from "@perfolio/hooks"

export const InlineTotalAssetChart: React.FC = (): JSX.Element => {
  const { portfolioHistory, isLoading } = usePortfolioHistory()
  const { currentValue } = useCurrentValue()
  const valueMap: Record<number, number> = {}

  if (!!portfolioHistory && Object.keys(portfolioHistory).length >= 1) {
    portfolioHistory.forEach((asset) => {
      asset?.history.forEach((day) => {
        if (day.value > 0) {
          if (!valueMap[day.time]) {
            valueMap[day.time] = 0
          }
          valueMap[day.time] += day.value * day.quantity
        }
      })
    })
  }
  const data = Object.entries(valueMap).map(([time, value]) => {
    return {
      time: Time.fromTimestamp(Number(time)).toDate().toLocaleDateString(),
      value,
    }
  })

  return (
    <div className="flex-col justify-center hidden w-full h-20 space-y-8 bg-gray-100 rounded xl:flex">
      <div className="relative w-full h-full">
        <AreaChart isLoading={isLoading} data={data} />
        <div className="absolute top-0 left-0 p-4">
          <span className="p-1 text-lg font-semibold text-black bg-gray-100 bg-opacity-75 rounded">
            {format(currentValue, { suffix: "€" })}
          </span>
        </div>
      </div>
    </div>
  )
}
