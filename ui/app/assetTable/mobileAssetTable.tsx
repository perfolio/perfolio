import { format } from "@perfolio/pkg/util/numbers"
import { Avatar, Drawer, Heading, Text, ToggleGroup } from "@perfolio/ui/components"
import React, { useState } from "react"
import cn from "classnames"
import { DetailAssetTableProps } from "./assetTable"
import { useCurrentPorfolioState, useUser } from "@perfolio/pkg/hooks"
import type { Range } from "@perfolio/pages/portfolio/[portfolioId]"
import { KPI } from "@perfolio/ui/components/kpi"
import { getCurrencySymbol } from "@perfolio/pkg/util/currency"
import { Divider } from "@perfolio/ui/components/divider"
import { AssetOverTime } from ".."

export const MobileAssetTable: React.FC<DetailAssetTableProps> = ({
  aggregation,
  setAggregation,
  ranges,
  range,
  setRange,
  costPerShare,
  totalValue,
}): JSX.Element => {
  const { currentPorfolioState } = useCurrentPorfolioState()
  const [open, setOpen] = useState(false)
  const { user } = useUser()
  let [clickedAsset, setClickedAsset] = useState(
    currentPorfolioState.length > 0 ? currentPorfolioState.at(0) : null,
  )

  // if (!clickedAsset)
  //   clickedAsset = {value: 0, quantity: 0, asset: {__typename: "",}}
  return (
    <>
      <div className="w-full overflow-hidden bg-white">
        <ul role="list">
          {(currentPorfolioState ?? [])
            /**
             * Sort by total value descending
             * The largest position is at the top of the table
             */
            .sort((a, b) => b.quantity * b.value - a.quantity * a.value)
            .map((holding) => {
              const change =
                aggregation === "absolute"
                  ? (holding.value - costPerShare[holding.asset.id]!) * holding.quantity
                  : holding.value / costPerShare[holding.asset.id]! - 1

              const weight = (holding.quantity * holding.value) / totalValue
              return (
                <button
                  key={holding.asset.id}
                  className="w-full"
                  onClick={() => {
                    setClickedAsset(holding), setOpen(!open)
                  }}
                >
                  <div className="flex h-0.5 overflow-hidden rounded bg-gray-100">
                    <span
                      style={{ width: `${weight * 100}%` }}
                      className="flex w-full h-2 mb-4 overflow-hidden bg-gray-300 rounded"
                    ></span>
                  </div>
                  <div className="flex w-full px-2 pb-4 space-x-2 md:px-6 ">
                    <div className="flex content-start w-full min-w-0 space-x-2">
                      <div className="relative left-0 self-center w-8 h-8 shrink-0">
                        <Avatar size="sm" src={holding.asset.logo} />
                      </div>
                      <div className="w-full min-w-0">
                        <div className="flex min-w-0">
                          <Text bold truncate>
                            {holding.asset.name}
                          </Text>
                        </div>
                        <div className="flex justify-start space-x-2">
                          <div className="self-center px-1 bg-gray-200 rounded whitespace-nowrap">
                            <Text size="sm">
                              {format(holding.quantity, {
                                prefix: "x ",
                                fractionDigits: 0,
                              })}
                            </Text>
                          </div>
                          <div className="whitespace-nowrap">
                            <Text>
                              {format(holding.value * holding.quantity, {
                                suffix: " €",
                              })}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className={cn(
                        change > 0 ? "text-success-dark" : "text-error-dark",
                        change > 0 ? "bg-success-light" : "bg-error-light",
                        "self-center px-1 rounded",
                      )}
                      onClick={(event) => {
                        event.stopPropagation(),
                          setAggregation(aggregation === "absolute" ? "relative" : "absolute")
                      }}
                    >
                      {format(
                        change,
                        aggregation === "absolute"
                          ? { suffix: "€", sign: true }
                          : { percent: true, suffix: "%", sign: true },
                      )}
                    </button>
                  </div>
                </button>
              )
            })}
        </ul>
      </div>
      <Drawer
        isOpen={open}
        close={() => setOpen(false)}
        height="100%"
        title={clickedAsset?.asset.name}
        subtitle={clickedAsset?.asset.ticker}
      >
        <Drawer.Content>
          <div className="w-full h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="block">
              <Text size="2xl" bold>
                {format(clickedAsset?.value ?? 0, {
                  suffix: getCurrencySymbol(user?.settings?.defaultCurrency),
                })}
              </Text>
            </div>
            <AssetOverTime
              assetId={clickedAsset?.asset.id}
              mic={user?.settings.defaultExchange.mic}
              start={ranges[range]}
            />
            <div className="flex w-full md:hidden">
              <ToggleGroup<Range>
                block
                size="lg"
                options={[
                  { display: "1W", id: "1W" },
                  { display: "1M", id: "1M" },
                  { display: "3M", id: "3M" },
                  { display: "6M", id: "6M" },
                  { display: "1Y", id: "1Y" },
                  { display: "YTD", id: "YTD" },
                  { display: "ALL", id: "ALL" },
                ]}
                selected={range}
                setSelected={setRange}
              />
            </div>
            <Divider />
            <div className="space-y-4">
              <Heading h3>Depot</Heading>
              <div className="flex justify-between">
                <div className="grid flex-row grid-cols-2 px-4 gap-x-6 gap-y-8">
                  <KPI
                    justify="start"
                    textAlignment="left"
                    label={"Total Value"}
                    value={clickedAsset ? clickedAsset.value * clickedAsset.quantity : 0}
                    format={(n) =>
                      format(n, {
                        suffix: getCurrencySymbol(user?.settings?.defaultCurrency),
                      })
                    }
                    isLoading={false}
                  />
                  <KPI
                    justify="start"
                    textAlignment="left"
                    label={"Quantity"}
                    value={clickedAsset?.quantity ?? 0}
                    format={(n) =>
                      format(n, {
                        prefix: "x ",
                      })
                    }
                    isLoading={false}
                  />
                  <KPI
                    justify="start"
                    textAlignment="left"
                    label={"Weight"}
                    value={
                      clickedAsset
                        ? ((clickedAsset?.quantity * clickedAsset?.value) / totalValue) * 100
                        : 0
                    }
                    format={(n) =>
                      format(n, {
                        suffix: "%",
                      })
                    }
                    isLoading={false}
                  />
                  <KPI
                    justify="start"
                    textAlignment="left"
                    label={"Cost per share"}
                    value={clickedAsset ? costPerShare[clickedAsset.asset.id] : 0}
                    format={(n) =>
                      format(n, {
                        suffix: getCurrencySymbol(user?.settings?.defaultCurrency),
                      })
                    }
                    isLoading={false}
                  />
                </div>
                <KPI
                  justify="end"
                  textAlignment="right"
                  enableColor
                  label={"Change"}
                  value={
                    clickedAsset
                      ? aggregation === "absolute"
                        ? (clickedAsset.value - costPerShare[clickedAsset.asset.id]!) *
                          clickedAsset.quantity
                        : clickedAsset.value / costPerShare[clickedAsset.asset.id]! - 1
                      : 0
                  }
                  format={(n) =>
                    format(
                      n,
                      aggregation === "absolute"
                        ? { suffix: "€", sign: true }
                        : { percent: true, suffix: "%", sign: true },
                    )
                  }
                  onClickContent={() =>
                    setAggregation(aggregation === "absolute" ? "relative" : "absolute")
                  }
                  isLoading={false}
                />
              </div>
              <Divider />
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Footer></Drawer.Footer>
      </Drawer>
    </>
  )
}
