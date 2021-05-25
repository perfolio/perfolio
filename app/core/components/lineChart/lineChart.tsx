import React from "react"

import { AreaChart as Chart, XAxis, Tooltip, Area, ResponsiveContainer } from "recharts"

export const LineChart: React.FC = (): JSX.Element => {
  let currentValue = 1_000
  let currentUnix = 1590255007000
  const data: { value: number; date: string }[] = []

  while (currentUnix < Date.now()) {
    currentValue += (currentValue * (Math.random() - 0.4)) / 10
    currentUnix += 24 * 60 * 60 * 1000
    data.push({
      value: currentValue,
      date: new Date(currentUnix).toLocaleDateString(),
    })
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="30%" stopColor="#059669" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#059669" fill="url(#colorUv)" />
        <XAxis dataKey="date" minTickGap={100} />
      </Chart>
    </ResponsiveContainer>
  )
}
