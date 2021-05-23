import React from "react"
import { PieChart as Chart, Cell, Pie, ResponsiveContainer } from "recharts"

const data = [
  "Energy",
  "Materials",
  "Industrials",
  "Utilities",
  "Healthcare",
  "Financials",
  "Consumer Discretionary",
  "Consumer Staples",
  "Information Technology",
  "Communication Services",
  "Real Estate",
]
  .map((sector) => {
    return {
      sector,
      value: Math.random() * 10_000,
    }
  })
  .filter((sector) => sector.value > 7_000)

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

  return (
    <text
      className="bg-white rounded-sm text-gray-700 border-gray-50"
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
    >
      {data[index]!.sector}
    </text>
  )
}
export const PieChart: React.FC = (): JSX.Element => {
  const COLORS = [
    "#EEF2FF",
    "#E0E7FF",
    "#C7D2FE",
    "#A5B4FC",
    "#818CF8",
    "#6366F1",
    "#4F46E5",
    "#4338CA",
    "#3730A3",
    "#312E81",
  ].reverse()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart width={400} height={400}>
        <Pie
          label={renderLabel}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          labelLine={false}
          fill="#8884d8"
          dataKey="value"
        >
          {" "}
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </Chart>
    </ResponsiveContainer>
  )
}
