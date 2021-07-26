import React, { useState, useMemo, useEffect } from "react"
import { PieChart, Sector, Cell, Pie, ResponsiveContainer } from "recharts"
import { Tooltip, ToggleGroup, Heading, Description } from "@perfolio/ui/components"
import { Loading } from "@perfolio/ui/components"
import { format } from "@perfolio/util/numbers"
import { useGetPortfolioHistoryQuery, ValueAndQuantityAtTime } from "@perfolio/api/graphql"
import { useUser } from "@clerk/clerk-react"

const COLORS = [
  "#D7DDFC",
  "#B0BCF9",
  "#8595EE",
  "#6375DE",
  "#3548C8",
  "#2636AC",
  "#1A2690",
  "#101974",
  "#0A1060",
].sort(() => Math.random() - 0.5)
export const DiversificationChart: React.FC = (): JSX.Element => {
  const user = useUser()
  const portfolioResponse = useGetPortfolioHistoryQuery({ variables: { userId: user.id } })
  const portfolio = React.useMemo(() => {
    const getLastValid = (
      history: ValueAndQuantityAtTime[],
    ): { quantity: number; value: number } => {
      const sorted = [...history].sort((a, b) => b.time - a.time)

      for (const day of sorted) {
        if (day.value > 0) {
          return day
        }
      }
      throw new Error("Nothing found")
    }

    return portfolioResponse.data?.getPortfolioHistory?.map((h) => {
      return {
        asset: {
          company: h.asset.__typename === "Stock" ? h.asset.company : undefined,
          id: h.asset.id,
        },
        ...getLastValid(h.history),
      }
    })
  }, [portfolioResponse.data])

  /**
   * Aggregate by sector
   */
  const sectors: { [sector: string]: number } = useMemo(() => {
    const tmp: { [sector: string]: number } = {}
    if (!portfolio) {
      return tmp
    }
    portfolio
      .filter((h) => !!h)
      .forEach((holding) => {
        const sector = holding?.asset.company?.sector
        if (sector) {
          if (!tmp[sector]) {
            tmp[sector] = 0
          }

          tmp[sector] += holding.quantity * holding.value
        }
      })
    return tmp
  }, [portfolio])

  /**
   * Aggregate by country
   */
  const countries: { [country: string]: number } = useMemo(() => {
    const tmp: { [country: string]: number } = {}
    if (!portfolio) {
      return tmp
    }
    portfolio
      .filter((h) => !!h)
      .forEach((holding) => {
        if (holding) {
          const country = holding.asset.company?.country
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

  /**
   * Selection can either be "sectors" or "counrties"
   */
  const [selected, setSelected] = useState("Sectors")

  const data = useMemo(
    () =>
      Object.entries(selected === "Countries" ? countries : sectors).map(([name, value]) => {
        return {
          name,
          value,
        }
      }),
    [sectors, countries, selected],
  )

  /**
   * Display the tooltip for the biggest position by default
   */
  const defaultSection = useMemo(() => {
    let biggestIndex = -1
    let max = 0
    data.forEach((d, i) => {
      if (d.value > max) {
        max = d.value
        biggestIndex = i
      }
    })
    return biggestIndex
  }, [data])

  const [activeIndex, setActiveIndex] = useState(-1)

  /**
   * Set the default index at the start
   */
  useEffect(() => {
    setActiveIndex(defaultSection)
  }, [defaultSection])

  return (
    <div className="w-full h-full space-y-2">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Heading h4>Diversification</Heading>
          <Tooltip side="right">
            <Description title="Diversification">
              Stock market diversity is a measure of the distribution of capital in an equity
              market. Diversification is higher when capital is more evenly distributed among the
              stocks in the market, and is lower when capital is more concentrated into a few of the
              largest companies.
            </Description>
          </Tooltip>
        </div>
        <ToggleGroup
          size="sm"
          options={["Sectors", "Countries"]}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        {!data || data.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loading />
          </div>
        ) : (
          <PieChart>
            <Pie
              startAngle={90}
              endAngle={450}
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
                      dy={25}
                      className="text-sm"
                      textAnchor="middle"
                    >
                      {name}
                    </text>
                    <text
                      x={cx}
                      y={cy}
                      dy={5}
                      textAnchor="middle"
                      className="text-4xl font-semibold"
                    >
                      {format(percent, { percent: true, suffix: "%", fractionDigits: 0 })}
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
                    setActiveIndex(defaultSection)
                  }
                }, 0)
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
