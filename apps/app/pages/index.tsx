import React, { useState, useMemo } from "react"
import { NextPage } from "next"
import { useCurrentValue, useHistory } from "@perfolio/data-access/queries"
import {
  AppLayout,
  DiversificationChart,
  AssetTable,
  ActivityFeed,
  AssetsOverTimeChart,
  Main,
  InlineTotalAssetChart,
  withAuthentication,
  AggregateOptions,
  Sidebar,
} from "@perfolio/app/components"
import { toTimeseries, rebalance, AssetsOverTime } from "@perfolio/feature/finance/returns"

import { Heading, ToggleGroup } from "@perfolio/ui/design-system"
import cn from "classnames"
import { format } from "@perfolio/util/numbers"

type Range = "1W" | "1M" | "3M" | "6M" | "1Y" | "YTD" | "ALL"

const ranges: Record<Range, number> = {
  "1W": new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).getTime(),
  "1M": new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).getTime(),
  "3M": new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 3).getTime(),
  "6M": new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6).getTime(),
  "1Y": new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).getTime(),
  YTD: new Date(new Date().getFullYear(), 0).getTime(),
  ALL: Number.NEGATIVE_INFINITY,
}

const App: NextPage = () => {
  const { currentValue } = useCurrentValue()
  const [range, setRange] = useState<Range>("ALL")
  const { history } = useHistory()

  const selectedHistory = useMemo<AssetsOverTime>(() => {
    if (!history) {
      return []
    }
    const series = toTimeseries(history)
    const selectedHistory: AssetsOverTime = {}
    Object.keys(series).forEach((time) => {
      if (Number(time) * 1000 >= ranges[range]) {
        selectedHistory[Number(time)] = series[Number(time)]
      }
    })
    return selectedHistory
  }, [history, range])

  const index = useMemo(() => rebalance(selectedHistory), [selectedHistory])
  const firstValue = useMemo(() => {
    let firstValue = 0
    console.log({ history })
    Object.values(Object.values(selectedHistory)[0] ?? {}).forEach((asset) => {
      if (asset.value > 0) {
        firstValue += asset.quantity * asset.value
      }
    })
    return firstValue
  }, [selectedHistory, history])

  console.log({ currentValue, firstValue })
  const absoluteChange = currentValue - firstValue
  const relativeChange = index ? Object.values(index)[Object.values(index).length - 1] - 1 : 0
  const [aggregation, setAggregation] = useState<AggregateOptions>("Relative")

  return (
    <AppLayout
      sidebar={
        <Sidebar aboveFold={<InlineTotalAssetChart />}>
          <div className="w-full pb-4 md:w-full sm:w-1/2">
            <div className="w-full mb-8 h-60">{<DiversificationChart />}</div>
          </div>
          <div className="w-full py-4 md:w-full sm:w-1/2">
            <ActivityFeed />
          </div>
        </Sidebar>
      }
    >
      <Main>
        <Main.Header>
          <Main.Header.Title title="Overview" />
          <ToggleGroup<AggregateOptions>
            options={["Relative", "Absolute"]}
            selected={aggregation}
            setSelected={setAggregation}
          />
        </Main.Header>
        <Main.Content>
          <div className="py-4 sm:py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-0">
              <div className="flex justify-center">
                <div className="flex flex-col space-y-3">
                  <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm">
                    Total Assets
                  </h4>
                  <span className="text-lg font-bold leading-3 text-gray-800 dark:text-gray-100 sm:text-xl md:text-2xl lg:text-3xl">
                    {format(currentValue, { suffix: "€" })}
                  </span>
                </div>
              </div>

              <div className="flex justify-center ">
                <div className="flex flex-col space-y-3">
                  <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm">
                    Change
                  </h4>

                  <span
                    className={cn(
                      "text-lg font-bold text-success-400 leading-3 whitespace-nowrap sm:text-xl md:text-2xl lg:text-3xl",
                      (aggregation === "Absolute" && absoluteChange >= 0) ||
                        (aggregation === "Relative" && relativeChange >= 0)
                        ? "text-success-400"
                        : "text-error-500",
                    )}
                  >
                    {aggregation === "Absolute"
                      ? format(absoluteChange, { suffix: "€", sign: true })
                      : format(relativeChange, { suffix: "%", percent: true, sign: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Main.Divider />
          <div className="pt-2 space-y-8">
            <div className="flex justify-center md:justify-end">
              <ToggleGroup<Range>
                options={Object.keys(ranges) as Range[]}
                selected={range}
                setSelected={setRange}
              />
            </div>
            <AssetsOverTimeChart aggregate={aggregation} range={ranges[range]} />
          </div>
          <div>
            <div className="py-4 md:py-6">
              <Heading h3>Current Assets</Heading>
            </div>

            <AssetTable aggregation={aggregation} />
          </div>
        </Main.Content>
      </Main>
    </AppLayout>
  )
}
export default withAuthentication(App)
