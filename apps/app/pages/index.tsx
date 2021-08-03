import React, { useState } from "react"
import { NextPage } from "next"
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
import { Heading, Loading, ToggleGroup, Tooltip } from "@perfolio/ui/components"
import cn from "classnames"
import { format } from "@perfolio/util/numbers"
import { getCurrencySymbol } from "@perfolio/util/currency"
import {
  useRelativePortfolioHistory,
  useStandardDeviation,
  useUserSettings,
  useCurrentAbsoluteValue,
  useAbsoluteMean,
  useRelativeMean,
  useAbsolutePortfolioHistory,
  usePortfolioHistory,
} from "@perfolio/hooks"
import { Time } from "@perfolio/util/time"

type Range = "1W" | "1M" | "3M" | "6M" | "1Y" | "YTD" | "ALL"

const today = Time.today().unix()
const ranges: Record<Range, number> = {
  "1W": today - Time.toSeconds("7d"),
  "1M": today - Time.toSeconds("30d"),
  "3M": today - Time.toSeconds("90d"),
  "6M": today - Time.toSeconds("180d"),
  "1Y": today - Time.toSeconds("365d"),
  YTD: new Date(new Date().getFullYear(), 0).getTime() / 1000,
  ALL: Number.NEGATIVE_INFINITY,
}

const KPI = ({
  label,
  value,
  enableColor,
  isLoading,
  format,
}: {
  label: string
  value: number
  enableColor?: boolean
  isLoading?: boolean
  format: (n: number) => string
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
            !isLoading && enableColor
              ? value >= 0
                ? "text-success"
                : "text-error"
              : "text-gray-800",
          )}
        >
          {isLoading ? <Loading /> : format(value)}
        </span>
      </div>
    </div>
  )
}

const App: NextPage = () => {
  const { currentAbsoluteValue } = useCurrentAbsoluteValue()
  const [range, setRange] = useState<Range>("ALL")
  const { settings } = useUserSettings()
  const { portfolioHistory } = usePortfolioHistory()
  const { absolutePortfolioHistory, isLoading: absoluteIsLoading } = useAbsolutePortfolioHistory(
    portfolioHistory,
    ranges[range],
  )
  const { relativePortfolioHistory, isLoading: relativeIsLoading } = useRelativePortfolioHistory(
    ranges[range],
  )

  const absoluteChange =
    absolutePortfolioHistory.length > 0
      ? currentAbsoluteValue - absolutePortfolioHistory[0].value
      : 0
  const relativeChange =
    relativePortfolioHistory.length > 0
      ? relativePortfolioHistory[relativePortfolioHistory.length - 1].value - 1
      : 0

  console.log({ relativePortfolioHistory, relativeChange })
  const [aggregation, setAggregation] = useState<AggregateOptions>("Relative")

  const { absoluteMean } = useAbsoluteMean(absolutePortfolioHistory)
  const { relativeMean } = useRelativeMean(relativePortfolioHistory)

  const { standardDeviation: relativeSTD } = useStandardDeviation(
    relativePortfolioHistory.map(({ value }) => value),
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
              <Tooltip
                trigger={
                  <KPI
                    label="Total Assets"
                    value={currentAbsoluteValue}
                    format={(n) =>
                      format(n, {
                        suffix: getCurrencySymbol(settings?.defaultCurrency),
                      })
                    }
                    isLoading={aggregation === "Absolute" && absoluteIsLoading}
                  />
                }
              >
                @webersni
              </Tooltip>

              <Tooltip
                trigger={
                  <KPI
                    enableColor
                    label={aggregation === "Absolute" ? "Mean Change" : "Mean Return"}
                    value={aggregation === "Absolute" ? absoluteMean : relativeMean}
                    format={(n) =>
                      aggregation === "Absolute"
                        ? format(n, {
                            suffix: getCurrencySymbol(settings?.defaultCurrency),
                            sign: true,
                          })
                        : format(n, { suffix: "%", percent: true, sign: true })
                    }
                    isLoading={
                      (aggregation === "Absolute" && absoluteIsLoading) ||
                      (aggregation === "Relative" && relativeIsLoading)
                    }
                  />
                }
              >
                @webersni
              </Tooltip>
              <Tooltip
                trigger={
                  <KPI
                    isLoading={
                      (aggregation === "Absolute" && absoluteIsLoading) ||
                      (aggregation === "Relative" && relativeIsLoading)
                    }
                    label="Standard Deviation"
                    value={relativeSTD}
                    format={(n) => format(n)}
                  />
                }
              >
                @webersni A large standard deviation is a sign of greater risk blabla Nico mach
                endlich!
              </Tooltip>
              <Tooltip
                trigger={
                  <KPI
                    label="Change"
                    enableColor
                    isLoading={
                      (aggregation === "Absolute" && absoluteIsLoading) ||
                      (aggregation === "Relative" && relativeIsLoading)
                    }
                    value={aggregation === "Absolute" ? absoluteChange : relativeChange}
                    format={(n) =>
                      aggregation === "Absolute"
                        ? format(n, {
                            suffix: getCurrencySymbol(settings?.defaultCurrency),
                            sign: true,
                          })
                        : format(n, { suffix: "%", percent: true, sign: true })
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
          <div className="mt-16">
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
