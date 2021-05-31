import React from "react"

import { AreaChart, XAxis, Tooltip, Area, ResponsiveContainer } from "recharts"

export const AssetsOverTimeChart: React.FC = (): JSX.Element => {
  let currentValue = 1_000
  let currentUnix = 1590255007000
  const data: { value: number; date: string }[] = []

  while (currentUnix < Date.now()) {
    currentValue += (currentValue * (Math.random() - 0.46)) / 3
    currentUnix += 24 * 60 * 60 * 1000
    data.push({
      value: currentValue,
      date: new Date(currentUnix).toLocaleDateString(),
    })
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#262059" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#262059" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#262059"
          strokeWidth={2}
          fill="url(#gradient)"
        />
        <XAxis dataKey="date" minTickGap={100} padding={{ right: 50 }} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
