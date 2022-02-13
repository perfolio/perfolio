import { useCurrentPorfolioState } from "@perfolio/pkg/hooks"
import { useI18n } from "next-localization"
import { format } from "@perfolio/pkg/util/numbers"
import { Description, Heading, ToggleGroup, Tooltip } from "@perfolio/ui/components"
import { Loading } from "@perfolio/ui/components"
import React, { useEffect, useMemo, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"

const COLORS = ["#3548C8", "#263594", "#131A47", "#161E54", "#0D1233"].sort(
  () => Math.random() - 0.5,
)

export const DiversificationChart: React.FC = (): JSX.Element => {
  const { t } = useI18n()
  const { currentPorfolioState } = useCurrentPorfolioState()

  /**
   * Aggregate by sector
   */
  const sectors: { [sector: string]: number } = useMemo(() => {
    const tmp: { [sector: string]: number } = {}
    if (!currentPorfolioState) {
      return tmp
    }
    currentPorfolioState
      .filter((h) => !!h)
      .forEach((holding) => {
        const sector = holding.asset.__typename === "Company" ? holding.asset.sector : undefined
        if (sector) {
          if (!tmp[sector]) {
            tmp[sector] = 0
          }

          tmp[sector] += holding.quantity * holding.value
        }
      })
    return tmp
  }, [currentPorfolioState])
  /**
   * Aggregate by country
   */
  const countries: { [country: string]: number } = useMemo(() => {
    const tmp: { [country: string]: number } = {}
    if (!currentPorfolioState) {
      return tmp
    }
    currentPorfolioState
      .filter((h) => !!h)
      .forEach((holding) => {
        if (holding) {
          const country = holding.asset.__typename === "Company" ? holding.asset.country : undefined
          if (country) {
            if (!tmp[country]) {
              tmp[country] = 0
            }

            tmp[country] += holding.quantity * holding.value
          }
        }
      })

    return tmp
  }, [currentPorfolioState])

  /**
   * Selection can either be "sectors" or "countries"
   */
  const [selected, setSelected] = useState<"sectors" | "countries">("sectors")

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
          <Heading h4>{t("app.diversityHeading")}</Heading>
          <Tooltip side="right">
            <Description title={t("app.diversityTitle")}>{t("app.diversityTooltip")}</Description>
          </Tooltip>
        </div>
      </div>
      <div className="max-w-lg m-auto">
        <ToggleGroup<"sectors" | "countries">
          options={[
            { display: t("app.diversityToggleSectors"), id: "sectors" },
            { display: t("app.diversityToggleCountries"), id: "countries" },
          ]}
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
                      {format(percent, {
                        percent: true,
                        suffix: "%",
                        fractionDigits: 0,
                      })}
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
                  if (name === data[activeIndex]?.name) {
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
