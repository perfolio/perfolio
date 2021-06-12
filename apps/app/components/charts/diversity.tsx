import { usePortfolio } from "../../queries"
import React, { useState, useMemo } from "react"
import { PieChart, Sector, Cell, Pie, ResponsiveContainer } from "recharts"

import { Spinner, Switch } from "@perfolio/components"

const COLORS = ["#49407D", "#362E6B", "#262059", "#191448", "#013269", "#002355", "#001946"].sort(
  () => Math.random() - 0.5,
)
export const DiversityChart: React.FC = (): JSX.Element => {
  const { portfolio } = usePortfolio()

  /**
   * Aggregate by sector
   */
  const sectors: { [sector: string]: number } = useMemo(() => {
    const tmp: { [sector: string]: number } = {}

    Object.entries(portfolio).forEach(([isin, holding]) => {
      if (holding.company) {
        const sector = holding.company.data.sector
        if (sector) {
          if (!tmp[sector]) {
            tmp[sector] = 0
          }

          tmp[sector] += holding.quantity * holding.value
        }
      }
    })

    return tmp
  }, [portfolio])

  /**
   * Aggregate by country
   */
  const countries: { [country: string]: number } = useMemo(() => {
    const tmp: { [country: string]: number } = {}

    Object.entries(portfolio).forEach(([isin, holding]) => {
      if (holding.company) {
        const country = holding.company.data.country
        if (country) {
          if (!tmp[country]) {
            tmp[country] = 0
          }

          tmp[country] += holding.quantity * holding.value
        }
      }
    })

    return tmp
  }, [portfolio])

  const [activeIndex, setActiveIndex] = useState(-1)
  const [selected, setSelected] = useState<"countries" | "sectors">("sectors")

  const data = useMemo(
    () =>
      Object.entries(selected === "countries" ? countries : sectors).map(([name, value]) => {
        return {
          name,
          value,
        }
      }),
    [sectors, countries, selected],
  )
  return (
    <div className="w-full h-full">
      <Switch onChange={(checked) => setSelected(checked ? "countries" : "sectors")} />

      <ResponsiveContainer width="100%" height="100%">
        {!data || data.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <Spinner />
          </div>
        ) : (
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={({
                cx,
                cy,
                name,
                innerRadius,
                outerRadius,
                startAngle,
                endAngle,
                fill,
                percent,
              }: {
                cx: number
                cy: number
                name: string
                innerRadius: number
                outerRadius: number
                startAngle: number
                endAngle: number
                fill: string
                percent: number
              }) => {
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
                    <text
                      filter="url(#solid)"
                      x={cx}
                      y={cy}
                      dy={16}
                      className="text-sm"
                      textAnchor="middle"
                    >
                      {name}
                    </text>
                    <text
                      x={cx}
                      y={cy}
                      dy={-2}
                      textAnchor="middle"
                      className="text-4xl font-semibold"
                    >
                      {(percent * 100).toFixed(0)}%
                    </text>
                  </g>
                )
              }}
              data={data}
              paddingAngle={1}
              cx="50%"
              cy="50%"
              innerRadius="80%"
              outerRadius="100%"
              dataKey="value"
              onMouseEnter={(_: void, index: number) => setActiveIndex(index)}
              onMouseLeave={({ name }: { name: string }) =>
                setTimeout(() => {
                  /**
                   * Do not remove the tooltip if the user has hovered a different part
                   */
                  if (name === data[activeIndex].name) {
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
        )}
      </ResponsiveContainer>
    </div>
  )
}
