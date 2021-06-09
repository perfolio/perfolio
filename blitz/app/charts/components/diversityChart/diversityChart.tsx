import React from "react"
import { PieChart, Cell, Pie, ResponsiveContainer } from "recharts"

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
      className="text-gray-700 bg-white rounded border-gray-50"
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
    >
      {data[index]!.sector}
    </text>
  )
}
export const DiversityChart: React.FC = (): JSX.Element => {
  const COLORS = [
    "#E5E0F8",
    "#A498D8",
    "#49407D",
    "#362E6B",
    "#262059",
    "#191448",
    "#100C3B",
  ].reverse()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
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
      </PieChart>
    </ResponsiveContainer>
  )
}
