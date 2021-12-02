import { format } from "@perfolio/pkg/util/numbers"
import { Avatar, Drawer, Text, ToggleGroup } from "@perfolio/ui/components"
import React, { useState } from "react"
import cn from "classnames"
import { DetailAssetTableProps } from "./assetTable"
import { useCurrentPorfolioState, useUser } from "@perfolio/pkg/hooks"
import { AssetsOverTimeChart } from ".."
import type { Range } from "@perfolio/pages/portfolio/[portfolioId]"
import { KPI } from "@perfolio/ui/components/kpi"
import { getCurrencySymbol } from "@perfolio/pkg/util/currency"
import { Divider } from "@perfolio/ui/components/divider"


export const MobileAssetTable: React.FC<DetailAssetTableProps> = ({
  aggregation,
  setAggregation,
  ranges,
  range,
  setRange,
  costPerShare,
  totalValue,
  //currentPortfolioState,
}): JSX.Element => {
  const { currentPorfolioState } = useCurrentPorfolioState()
  const [open, setOpen] = useState(false);
  const { user } = useUser()
  const [clickedAsset, setClickedAsset] = useState(currentPorfolioState.at(0));

  return (
    <>
      <div className="w-full bg-white overflow-hidden">
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
                <button key={holding.asset.id} className="w-full" onClick={() => { setClickedAsset(holding), setOpen(!open) }}>
                  <div className="flex h-0.5 overflow-hidden rounded bg-gray-100">
                    <span
                      style={{ width: `${weight * 100}%` }}
                      className="flex w-full h-2 mb-4 overflow-hidden rounded bg-gray-300"
                    >
                    </span>
                  </div>
                  <div className="w-full flex px-2 pb-4 md:px-6 space-x-2 ">
                    <div className="flex w-full content-start space-x-2 min-w-0">
                      <div className="relative left-0 flex-shrink-0 w-8 h-8 self-center">
                        <Avatar size="sm" src={holding.asset.logo} />
                      </div>
                      <div className="w-full min-w-0">
                        <div className="flex min-w-0">
                          <Text bold truncate>{holding.asset.name}</Text>
                        </div>
                        <div className="flex space-x-2 justify-start">
                          <div className="bg-gray-200 self-center px-1 rounded whitespace-nowrap">
                            <Text size="sm">{format(holding.quantity, { prefix: "x ", fractionDigits: 0 })}</Text>
                          </div>
                          <div className="whitespace-nowrap">
                            <Text>{format(holding.value * holding.quantity, { suffix: " €" })}</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        change > 0 ? "text-success-dark" : "text-error-dark",
                        change > 0 ? "bg-success-light" : "bg-error-light",
                        "self-center px-1 rounded",
                      )}
                      onClick={(event) => { event.stopPropagation(), setAggregation(aggregation === "absolute" ? "relative" : "absolute") }}
                    >
                      {format(
                        change,
                        aggregation === "absolute"
                          ? { suffix: "€", sign: true }
                          : { percent: true, suffix: "%", sign: true },
                      )}
                    </div>
                  </div>

                </button>
              )
            })}
        </ul>
      </div>
      <Drawer open={open} setOpen={setOpen} height="100%" title={clickedAsset?.asset.name} subtitle={clickedAsset?.asset.ticker}>
        <Drawer.Content>
          <div className="w-full h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="block">
              <Text size="2xl" bold >{format(clickedAsset === undefined ? 0 : clickedAsset?.value, {
                suffix: getCurrencySymbol(
                  user?.settings?.defaultCurrency,
                ),
              })}</Text>
            </div>
            <AssetsOverTimeChart
              aggregate={aggregation}
              since={ranges[range]}
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
            <Divider height="sm"/>
            <div className="py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-0">
                <KPI
                  label={"Total Value"}
                  value={clickedAsset === undefined ? 0 : clickedAsset.value * clickedAsset.quantity}
                  format={(n) =>
                    format(n, {
                      suffix: getCurrencySymbol(
                        user?.settings?.defaultCurrency,
                      ),
                    })}
                  isLoading={false}
                />
                <KPI
                  label={"Quantity"}
                  value={clickedAsset === undefined ? 0 : clickedAsset?.quantity}
                  format={(n) =>
                    format(n, {
                      prefix: "x "
                    })}
                  isLoading={false}
                />
                <KPI
                  label={"Weight"}
                  value={clickedAsset === undefined ? 0 : ((clickedAsset?.quantity * clickedAsset?.value) / totalValue) * 100}
                  format={(n) =>
                    format(n, {
                      suffix: "%"
                    })}
                  isLoading={false}
                />
                {/* <KPI
                  label={"Price per share"}
                  value={clickedAsset === undefined ? 0 : clickedAsset.value}
                  format={(n) =>
                    format(n, {
                      suffix: getCurrencySymbol(
                        user?.settings?.defaultCurrency,
                      ),
                    })}
                  isLoading={false}
                /> */}
                <KPI
                  label={"Cost per share"}
                  value={clickedAsset === undefined ? 0 : costPerShare[clickedAsset.asset.id]}
                  format={(n) =>
                    format(n, {
                      suffix: getCurrencySymbol(
                        user?.settings?.defaultCurrency,
                      ),
                    })}
                  isLoading={false}
                />
                <KPI
                  label={"Change"}
                  value={clickedAsset === undefined ? 0 : aggregation === "absolute"
                    ? (clickedAsset.value - costPerShare[clickedAsset.asset.id]!)
                    * clickedAsset.quantity
                    : clickedAsset.value / costPerShare[clickedAsset.asset.id]! - 1}
                  format={(n) =>
                    format(
                      n,
                      aggregation === "absolute"
                        ? { suffix: "€", sign: true }
                        : { percent: true, suffix: "%", sign: true },
                    )}
                  isLoading={false}
                />
              </div>
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Footer>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}
