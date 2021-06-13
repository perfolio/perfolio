import React from "react"
import { useHistory } from "../../queries"
import { AreaChart, XAxis, Tooltip, Area, ResponsiveContainer } from "recharts"
import { Time } from "@perfolio/time"
import { Box, Spinner } from "@perfolio/components"

export const AssetsOverTimeChart: React.FC = (): JSX.Element => {
  const { history, isLoading } = useHistory()
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

  // while (currentUnix < Date.now()) {
  //   currentValue += (currentValue * (Math.random() - 0.46)) / 3
  //   currentUnix += 24 * 60 * 60 * 1000
  //   data.push({
  //     value: currentValue,
  //     date: new Date(currentUnix).toLocaleDateString(),
  //   })
  // }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded animate-pulse">
          <Spinner />
        </div>
      ) : (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#262059" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#262059" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload) {
                return null
              }

              const { time, value } = payload[0].payload
              return (
                <Box className="flex flex-col p-4 text-center bg-gray-50">
                  <span className="text-xl font-medium">${value.toFixed(2)}</span>
                  <span className="text-sm text-gray-700">{time}</span>
                </Box>
              )
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#262059"
            strokeWidth={2}
            fill="url(#gradient)"
          />
          <XAxis dataKey="time" minTickGap={100} padding={{ right: 50 }} />
        </AreaChart>
      )}
    </ResponsiveContainer>
  )
}
