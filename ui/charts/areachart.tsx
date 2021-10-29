import React from "react"
import { AreaChart as Chart, XAxis, Tooltip, Area, ResponsiveContainer, YAxis } from "recharts"
import { Loading } from "@perfolio/ui/components"
type Data = {
  time: string
  value: number
}[]

export interface AreaChartProps {
  data: Data
  isLoading?: boolean
  tooltip?: (n: number) => string
  withXAxis?: boolean
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  isLoading,
  tooltip,
  withXAxis = false,
}): JSX.Element => {
  const max = Math.max(...data.map((d) => d.value)) * 1.02
  const min = Math.min(...data.map((d) => d.value)) * 0.98
  return (
    <ResponsiveContainer width="100%" height="100%">
      {isLoading ? (
        <Loading bg="bg-gray-100" />
      ) : (
        <Chart data={data}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#3548c8" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3548c8" stopOpacity={0} />
            </linearGradient>
          </defs>
          {tooltip ? (
            <Tooltip
              content={({
                active,
                payload,
              }: {
                active?: boolean
                payload?: { payload?: { time: string; value: number } }[]
              }) => {
                if (!active || !payload) {
                  return null
                }

                const { time, value } = payload[0]?.payload ?? { time: "", value: 0 }
                return (
                  <div className="flex flex-col p-4 text-center shadow-lg bg-gray-50">
                    <span className="text-xl font-medium">{tooltip(value)}</span>
                    <span className="text-sm text-gray-700">{time}</span>
                  </div>
                )
              }}
            />
          ) : null}
          <YAxis hide domain={[min, max]} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3548c8"
            strokeWidth={2}
            fill="url(#gradient)"
          />
          {withXAxis ? <XAxis dataKey="time" minTickGap={100} /> : null}
        </Chart>
      )}
    </ResponsiveContainer>
  )
}
