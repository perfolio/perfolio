import {
  useAbsoluteMean,
  useAbsoluteTotalHistory,
  useCurrentAbsoluteValue,
  usePortfolioHistory,
  usePrefetchPortfolioHistory,
  useRelativeMean,
  useStandardDeviation,
  useUser,
} from "@perfolio/pkg/hooks"
import { getCurrencySymbol } from "@perfolio/pkg/util/currency"
import { format } from "@perfolio/pkg/util/numbers"
import {
  ActivityFeed,
  AggregateOptions,
  AppLayout,
  AssetsOverTimeChart,
  AssetTable,
  DiversificationChart,
  Main,
  Sidebar,
} from "@perfolio/ui/app"
import { Heading, ToggleGroup, Tooltip } from "@perfolio/ui/components"
import { GetStaticProps, NextPage } from "next"
import React, { useState, useMemo } from "react"
import { useI18n } from "next-localization"

import { Time } from "@perfolio/pkg/util/time"
import KPI from "@perfolio/ui/components/kpi/kpi"

export type Range = "1W" | "1M" | "3M" | "6M" | "YTD" | "1Y" | "ALL"

interface PageProps {}

const App: NextPage<PageProps> = () => {
  useUser()

  const today = useMemo(() => Time.today().unix(), [])
  const ranges: Record<Range, number> = {
    "1W": today - Time.toSeconds("7d"),
    "1M": today - Time.toSeconds("30d"),
    "3M": today - Time.toSeconds("90d"),
    "6M": today - Time.toSeconds("180d"),
    YTD: new Date(new Date().getFullYear(), 0).getTime() / 1000,
    "1Y": today - Time.toSeconds("365d"),
    ALL: Number.NEGATIVE_INFINITY,
  }
  const { t } = useI18n()

  const { currentAbsoluteValue } = useCurrentAbsoluteValue()
  const [range, setRange] = useState<Range>("ALL")
  const { user } = useUser()

  const { history, isLoading: historyLoading } = usePortfolioHistory({
    since: ranges[range],
  })

  /**
   * Prefetch all history charts
   */
  usePrefetchPortfolioHistory(Object.values(ranges))

  const { absoluteTotal } = useAbsoluteTotalHistory({
    since: ranges[range],
  })
  const absoluteChange = 0
  const relativeChange = 0
  // const absoluteChange = aggregatedAbsolutePortfolioHistory.length > 0
  //   ? currentAbsoluteValue - aggregatedAbsolutePortfolioHistory[0].value
  //   : 0
  // const relativeChange = portfolio?.relativeHistory.length > 0
  //   ? portfolio?.relativeHistory[portfolio?.relativeHistory.length - 1].value - 1
  //   : 0

  const [aggregation, setAggregation] = useState<AggregateOptions>("relative")

  const { absoluteMean } = useAbsoluteMean(absoluteTotal)
  const { relativeMean } = useRelativeMean(history.relative)

  const { standardDeviation: relativeSTD } = useStandardDeviation(
    history.relative.map(({ value }) => value),
  )

  return (
    <AppLayout
      sidebar={
        <Sidebar>
          <div className="w-full pb-4">
            <div className="w-full mb-8 h-60">{<DiversificationChart />}</div>
          </div>
          <div className="w-full py-4">
            <ActivityFeed />
          </div>
        </Sidebar>
      }
    >
      <Main>
        {/* <OnboardingModal /> */}
        <Main.Header>
          <Main.Header.Title title={t("app.mainHeaderTitle")} />

          <ToggleGroup<AggregateOptions>
            options={[
              { display: t("app.relPicked"), id: "relative" },
              { display: t("app.absPicked"), id: "absolute" },
            ]}
            selected={aggregation}
            setSelected={setAggregation}
          />
        </Main.Header>
        <Main.Content>
          {/* {!portfolioHistoryIsLoading && portfolioHistory.length === 0 ? (
            <NoTransactionsModal />
          ) : null} */}
          <div className="py-4 sm:py-6 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-0">
              <Tooltip
                trigger={
                  <KPI
                    label={t("app.totalAssetsLabel")}
                    value={currentAbsoluteValue}
                    format={(n) =>
                      format(n, {
                        suffix: getCurrencySymbol(user?.settings?.defaultCurrency),
                      })
                    }
                    isLoading={historyLoading}
                  />
                }
              >
                {t("app.totalAssetsTooltip")}
              </Tooltip>

              <Tooltip
                trigger={
                  <KPI
                    enableColor
                    label={
                      aggregation === "absolute"
                        ? t("app.meanChangeLabel")
                        : t("app.meanReturnLabel")
                    }
                    value={aggregation === "absolute" ? absoluteMean : relativeMean}
                    format={(n) =>
                      aggregation === "absolute"
                        ? format(n, {
                            suffix: getCurrencySymbol(user?.settings?.defaultCurrency),
                            sign: true,
                          })
                        : format(n, { suffix: "%", percent: true, sign: true })
                    }
                    isLoading={historyLoading}
                  />
                }
              >
                {t("app.meanReturnTooltip")}
              </Tooltip>
              <Tooltip
                trigger={
                  <KPI
                    isLoading={historyLoading}
                    label={t("app.stdDevLabel")}
                    value={relativeSTD}
                    format={(n) => format(n)}
                  />
                }
              >
                {t("app.stdDevTooltip")}
              </Tooltip>
              <Tooltip
                trigger={
                  <KPI
                    label={t("app.changeLabel")}
                    enableColor
                    isLoading={historyLoading}
                    value={aggregation === "absolute" ? absoluteChange : relativeChange}
                    format={(n) =>
                      aggregation === "absolute"
                        ? format(n, {
                            suffix: getCurrencySymbol(user?.settings?.defaultCurrency),
                            sign: true,
                          })
                        : format(n, { suffix: "%", percent: true, sign: true })
                    }
                  />
                }
              >
                {t("app.changeTooltip")}
              </Tooltip>
            </div>
          </div>
          <Main.Divider />
          <div className="pt-2 space-y-8">
            <div className="hidden md:flex md:justify-end">
              <ToggleGroup<Range>
                options={[
                  { display: "1W", id: "1W" },
                  { display: "1M", id: "1M" },
                  { display: "3M", id: "3M" },
                  { display: "6M", id: "6M" },
                  { display: t("app.index1Y"), id: "1Y" },
                  { display: t("app.indexYTD"), id: "YTD" },
                  { display: t("app.indexAll"), id: "ALL" },
                ]}
                selected={range}
                setSelected={setRange}
              />
            </div>
            <AssetsOverTimeChart aggregate={aggregation} since={ranges[range]} />
            <div className="flex w-full md:hidden">
              <ToggleGroup<Range>
                block
                size="lg"
                options={[
                  { display: "1W", id: "1W" },
                  { display: "1M", id: "1M" },
                  { display: "3M", id: "3M" },
                  { display: "6M", id: "6M" },
                  { display: t("app.index1Y"), id: "1Y" },
                  { display: t("app.indexYTD"), id: "YTD" },
                  { display: t("app.indexAll"), id: "ALL" },
                ]}
                selected={range}
                setSelected={setRange}
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-16">
            <div className="py-4 md:py-6">
              <Heading h3>{t("app.assetTableHeading")}</Heading>
            </div>

            <AssetTable
              aggregation={aggregation}
              setAggregation={setAggregation}
              ranges={ranges}
              range={range}
              setRange={setRange}
            />
          </div>
        </Main.Content>
      </Main>
    </AppLayout>
  )
}

export default App

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const { default: translations } = await import(`@perfolio/public/locales/${locale}.json`)

  return {
    props: {
      translations,
    },
  }
}
