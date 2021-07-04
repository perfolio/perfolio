import React from "react"
import { AreaChart, Area, ResponsiveContainer } from "recharts"
import { useHistory, useCurrentValue } from "@perfolio/data-access/queries"
import { Time } from "@perfolio/util/time"
import { Loading } from "@perfolio/ui/components"
import { format } from "@perfolio/util/numbers"
export const InlineTotalAssetChart: React.FC = (): JSX.Element => {
  const { history, isLoading } = useHistory()
  const { currentValue } = useCurrentValue()
  const valueMap: Record<number, number> = {}

  if (!!history && Object.keys(history).length >= 1) {
    Object.values(history).forEach((asset) => {
      asset.forEach((day) => {
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
        <ResponsiveContainer width="100%" height="100%">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded animate-pulse">
              <Loading />
            </div>
          ) : (
            <AreaChart data={data} margin={{ top: 0, left: 0, bottom: 0, right: 0 }}>
              <defs>
                <linearGradient id="inlineAssetChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#262059" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#262059" stopOpacity={0} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke="#262059"
                strokeWidth={2}
                fill="url(#inlineAssetChartGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
        <div className="absolute top-0 left-0 p-4">
          <span className="p-1 text-lg font-semibold bg-gray-100 bg-opacity-75 rounded text-primary-600">
            {format(currentValue, { suffix: "€" })}
          </span>
        </div>
      </div>
    </div>
  )
}
