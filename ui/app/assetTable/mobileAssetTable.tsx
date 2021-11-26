import { format } from "@perfolio/pkg/util/numbers"
import { Avatar, Text } from "@perfolio/ui/components"
import React from "react"
import cn from "classnames"
import { DetailAssetTableProps } from "./assetTable"
import { useCurrentPorfolioState } from "@perfolio/pkg/hooks"


export const MobileAssetTable: React.FC<DetailAssetTableProps> = ({
  aggregation,
  setAggregation,
  costPerShare,
  totalValue,
  //currentPortfolioState,
}): JSX.Element => {
  const { currentPorfolioState } = useCurrentPorfolioState()

  return (
      <div className="flex md:hidden w-full">
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
                  <div key={holding.asset.id} className="w-full">
                    <div className="flex h-0.5 overflow-hidden rounded bg-gray-100">
                      <span
                        style={{ width: `${weight * 100}%` }}
                        className="flex w-full h-2 mb-4 overflow-hidden rounded bg-gray-300"
                      >
                      </span>
                    </div>
                    <div className="w-full flex px-2 pb-4 md:px-6 ">
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
                        onClick={() => setAggregation(aggregation === "absolute" ? "relative" : "absolute")}
                      >
                        {format(
                          change,
                          aggregation === "absolute"
                            ? { suffix: "€", sign: true }
                            : { percent: true, suffix: "%", sign: true },
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
          </ul>
        </div>
      </div>
  )
}
