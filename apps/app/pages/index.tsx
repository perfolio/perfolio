import React, { useState, useMemo } from "react"
import { NextPage } from "next"
import { useUser } from "@clerk/clerk-react"
import { useGetPortfolioHistoryQuery } from "@perfolio/api/graphql"
import {
  AppLayout,
  DiversificationChart,
  AssetTable,
  ActivityFeed,
  AssetsOverTimeChart,
  Main,
  InlineTotalAssetChart,
  AggregateOptions,
  Sidebar,
} from "@perfolio/app/components"
import { toTimeseries, rebalance, AssetsOverTime } from "@perfolio/feature/finance/returns"
import { Heading, ToggleGroup, Tooltip } from "@perfolio/ui/components"
import cn from "classnames"
import { format } from "@perfolio/util/numbers"
import { Mean, standardDeviation } from "@perfolio/feature/finance/kpis"
import { getCurrencySymbol } from "@perfolio/util/currency"
import { useGetUserSettingsQuery } from "@perfolio/api/graphql"
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

const KPI = ({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color?: string
}): JSX.Element => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col space-y-3">
        <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm">
          {label}
        </h4>
        <span
          className={cn(
            "text-lg font-bold leading-3 sm:text-xl md:text-2xl lg:text-3xl",
            color ?? "text-gray-800",
          )}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

const App: NextPage = () => {
  const user = useUser()
  const currentValue = 4 //useCurrentValue()
  const [range, setRange] = useState<Range>("ALL")
  const historyResponse = useGetPortfolioHistoryQuery({ variables: { userId: user.id } })
  const settingsResponse = useGetUserSettingsQuery({ variables: { userId: user.id } })
  const history = historyResponse.data?.getPortfolioHistory
  const settings = settingsResponse.data?.getUserSettings

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
    Object.values(Object.values(selectedHistory)[0] ?? {}).forEach((asset) => {
      if (asset.value > 0) {
        firstValue += asset.quantity * asset.value
      }
    })
    return firstValue
  }, [selectedHistory])

  const absoluteChange = currentValue - firstValue
  const relativeChange = index ? Object.values(index)[Object.values(index).length - 1] - 1 : 0
  const [aggregation, setAggregation] = useState<AggregateOptions>("Relative")

  const absoluteTimeseries = Object.values(selectedHistory).map((assets) => {
    return Object.values(assets)
      .map((asset) => asset.quantity * asset.value)
      .reduce((acc, val) => acc + val)
  })
  const absoluteMean = useMemo(() => Mean.getAbsolute(absoluteTimeseries), [absoluteTimeseries])
  const relativeMean = useMemo(() => Mean.getRelative(Object.values(index)), [index])
  const relativeSTD = useMemo(
    () => (index && Object.keys(index).length >= 2 ? standardDeviation(Object.values(index)) : 0),
    [index],
  )

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
            <div className="grid grid-cols-2 md:grid-cols-4 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-0">
              <div className="flex justify-center">
                <div className="flex flex-col space-y-3">
                  <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm">
                    Total Assets
                  </h4>
                  <span className="text-lg font-bold leading-3 text-gray-800 dark:text-gray-100 sm:text-xl md:text-2xl lg:text-3xl">
                    {format(currentValue, { suffix: getCurrencySymbol(settings?.defaultCurrency) })}
                  </span>
                </div>
              </div>

              <Tooltip
                trigger={
                  <KPI
                    label={aggregation === "Absolute" ? "Mean Change" : "Mean Return"}
                    color={
                      (aggregation === "Relative" && relativeMean >= 0) ||
                      (aggregation === "Absolute" && absoluteMean > 0)
                        ? "text-success-400"
                        : "text-error-500"
                    }
                    value={
                      aggregation === "Absolute"
                        ? format(absoluteMean, {
                            suffix: getCurrencySymbol(settings?.defaultCurrency),
                            sign: true,
                          })
                        : format(relativeMean, { suffix: "%", percent: true, sign: true })
                    }
                  />
                }
              >
                @webersni
              </Tooltip>
              <Tooltip trigger={<KPI label="Standard Deviation" value={format(relativeSTD)} />}>
                @webersni
              </Tooltip>
              <Tooltip
                trigger={
                  <KPI
                    label="Change"
                    color={
                      aggregation === "Relative" && relativeChange >= 0
                        ? "text-success-400"
                        : "text-error-500"
                    }
                    value={
                      aggregation === "Absolute"
                        ? format(absoluteChange, {
                            suffix: getCurrencySymbol(settings?.defaultCurrency),
                            sign: true,
                          })
                        : format(relativeChange, { suffix: "%", percent: true, sign: true })
                    }
                  />
                }
              >
                @webersni
              </Tooltip>
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
export default App
