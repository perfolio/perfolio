import React from "react"
import { AreaChart as Chart, XAxis, Tooltip, Area, ResponsiveContainer } from "recharts"
import { Box, Spinner } from "@perfolio/ui/components"

type Data = {
  time: string
  value: number
}[]

export interface AreaChartProps {
  data: Data
  isLoading?: boolean
  formatTooltip?: (n: number) => string
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  isLoading,
  formatTooltip = (n: number) => n.toString(),
}): JSX.Element => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded animate-pulse">
          <Spinner />
        </div>
      ) : (
        <Chart data={data}>
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
                  <span className="text-xl font-medium">{formatTooltip(value.toFixed(2))}</span>
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
          <XAxis dataKey="time" minTickGap={100} />
        </Chart>
      )}
    </ResponsiveContainer>
  )
}
