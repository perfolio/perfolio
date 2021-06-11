import { usePortfolio } from "../../queries"
import React, { useState } from "react"
import { PieChart, Sector, Cell, Pie, ResponsiveContainer } from "recharts"
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
      {data[index].sector}
    </text>
  )
}

const renderActiveShape = ({
  cx,
  cy,
  name,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  percent,
}: any) => {
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 7}
        outerRadius={innerRadius - 5}
        fill={fill}
      />
      <defs>
        <filter x="0" y="0" width="1" height="1" id="solid">
          <feFlood floodColor="white" result="bg" />
          <feMerge>
            <feMergeNode in="bg" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text filter="url(#solid)" x={cx} y={cy} dy={16} className="text-sm" textAnchor="middle">
        {data[name].sector}
      </text>
      <text x={cx} y={cy} dy={-2} textAnchor="middle" className="text-4xl font-semibold">
        {(percent * 100).toFixed(0)}%
      </text>
    </g>
  )
}
const COLORS = ["#49407D", "#362E6B", "#262059", "#191448", "#013269", "#002355", "#001946"].sort(
  () => Math.random() - 0.5,
)
export const DiversityChart: React.FC = (): JSX.Element => {
  const { portfolio } = usePortfolio()
  console.log({ portfolio })

  const [activeIndex, setActiveIndex] = useState(-1)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          paddingAngle={1}
          cx="50%"
          cy="50%"
          innerRadius="80%"
          outerRadius="100%"
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={(e) =>
            setTimeout(() => {
              /**
               * Do not remove the tooltip if the user has hovered a different part
               */
              if (e.name === activeIndex) {
                setActiveIndex(-1)
              }
            }, 300)
          }
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
