import React, { useState } from "react"
import { NextPage, GetStaticProps } from "next"
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
  useUser,
  useCurrentAbsoluteValue,
  useAbsoluteMean,
  useRelativeMean,
  useAbsolutePortfolioHistory,
  usePortfolioHistory,
} from "@perfolio/hooks"
import { OnboardingModal } from "@perfolio/app/middleware"

import { withAuthenticationRequired } from "@perfolio/app/middleware"
import { getTranslations, useI18n } from "@perfolio/feature/i18n"
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
        <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm whitespace-nowrap">
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

interface PageProps {
  translations: Record<string, string>
}

const App: NextPage<PageProps> = ({ translations }) => {
  const { t } = useI18n(translations)
 
  const { currentAbsoluteValue } = useCurrentAbsoluteValue()
  const [range, setRange] = useState<Range>("ALL")
  const { user } = useUser()

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

  const [aggregation, setAggregation] = useState<AggregateOptions>("relative")

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
        <OnboardingModal />
        <Main.Header>
          <Main.Header.Title title={t("mainHeaderTitle")} />

          <ToggleGroup<AggregateOptions>
            options={[
              { display: t("relPicked"), id: "relative" },
              { display: t("absPicked"), id: "absolute" },
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
                    label={t("totalAssetsLabel")}
                    value={currentAbsoluteValue}
                    format={(n) =>
                      format(n, {
                        suffix: getCurrencySymbol(user?.settings?.defaultCurrency),
                      })
                    }
                    isLoading={aggregation === "absolute" && absoluteIsLoading}
                  />
                }
              >
                {t("totalAssetsTooltip")}
              </Tooltip>

              <Tooltip
                trigger={
                  <KPI
                    enableColor
                    label={aggregation === "absolute" ? t("meanChangeLabel") : t("meanReturnLabel")}
                    value={aggregation === "absolute" ? absoluteMean : relativeMean}
                    format={(n) =>
                      aggregation === "absolute"
                        ? format(n, {
                            suffix: getCurrencySymbol(user?.settings?.defaultCurrency),
                            sign: true,
                          })
                        : format(n, { suffix: "%", percent: true, sign: true })
                    }
                    isLoading={
                      (aggregation === "absolute" && absoluteIsLoading) ||
                      (aggregation === "relative" && relativeIsLoading)
                    }
                  />
                }
              >
                {t("meanReturnTooltip")}
              </Tooltip>
              <Tooltip
                trigger={
                  <KPI
                    isLoading={
                      (aggregation === "absolute" && absoluteIsLoading) ||
                      (aggregation === "relative" && relativeIsLoading)
                    }
                    label={t("stdDevLabel")}
                    value={relativeSTD}
                    format={(n) => format(n)}
                  />
                }
              >
                {t("stdDevTooltip")}
              </Tooltip>
              <Tooltip
                trigger={
                  <KPI
                    label={t("changeLabel")}
                    enableColor
                    isLoading={
                      (aggregation === "absolute" && absoluteIsLoading) ||
                      (aggregation === "relative" && relativeIsLoading)
                    }
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
                {t("changeTooltip")}
              </Tooltip>
            </div>
          </div>
          <Main.Divider />
          <div className="pt-2 space-y-8">
            <div className="flex justify-center md:justify-end">
              <ToggleGroup<Range>
                options={[
                  { display: "1W", id: "1W" },
                  { display: "1M", id: "1M" },
                  { display: "3M", id: "3M" },
                  { display: "6M", id: "6M" },
                  { display: t("index1Y"), id: "1Y" },
                  { display: t("indexYTD"), id: "YTD" },
                  { display: t("indexAll"), id: "ALL" },
                ]}
                selected={range}
                setSelected={setRange}
              />
            </div>
            <AssetsOverTimeChart aggregate={aggregation} range={ranges[range]} />
          </div>
          <div className="mt-16">
            <div className="py-4 md:py-6">
              <Heading h3>{t("assetTableHeading")}</Heading>
            </div>

            <AssetTable aggregation={aggregation} />
          </div>
        </Main.Content>
      </Main>
    </AppLayout>
  )
}

export default withAuthenticationRequired(App)

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
