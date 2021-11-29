import { useCurrentPorfolioState } from "@perfolio/pkg/hooks"
import { format } from "@perfolio/pkg/util/numbers"
import { Avatar, Text } from "@perfolio/ui/components"
import cn from "classnames"
import React from "react"
import { DetailAssetTableProps } from "./assetTable"

export const MobileAssetTable: React.FC<DetailAssetTableProps> = ({
  aggregation,
  setAggregation,
  costPerShare,
  totalValue,
  // currentPortfolioState,
}): JSX.Element => {
  const { currentPorfolioState } = useCurrentPorfolioState()

  return (
    <div className="flex w-full">
      <div className="w-full overflow-hidden bg-white">
        <ul role="list" className="space-y-4">
          {currentPorfolioState
            /**
             * Sort by total value descending
             * The largest position is at the top of the table
             */
            .sort((a, b) => b.quantity * b.value - a.quantity * a.value)
            .map((holding) => {
              const change = aggregation === "absolute"
                ? (holding.value - costPerShare[holding.asset.id]!) * holding.quantity
                : holding.value / costPerShare[holding.asset.id]! - 1

              const weight = (holding.quantity * holding.value) / totalValue
              return (
                <div key={holding.asset.id} className="w-full">
                  <div className="flex h-0.5 overflow-hidden rounded bg-gray-100">
                    <span
                      style={{ width: `${weight * 100}%` }}
                      className="flex w-full h-2 mb-4 overflow-hidden bg-gray-300 rounded"
                    >
                    </span>
                  </div>
                  <div className="flex w-full px-2 py-2 space-x-2">
                    <div className="flex content-start w-full min-w-0 space-x-2">
                      <div className="relative left-0 self-center flex-shrink-0 w-8 h-8">
                        <Avatar size="sm" src={holding.asset.logo} />
                      </div>
                      <div className="w-full min-w-0">
                        <div className="flex min-w-0">
                          <Text bold truncate>{holding.asset.name}</Text>
                        </div>
                        <div className="flex justify-start space-x-2">
                          <div className="self-center px-1 bg-gray-200 rounded whitespace-nowrap">
                            <Text size="sm">
                              {format(holding.quantity, { prefix: "x ", fractionDigits: 2 })}
                            </Text>
                          </div>
                          <div className="whitespace-nowrap">
                            <Text>
                              {format(holding.value * holding.quantity, { suffix: " €" })}
                            </Text>
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
                      onClick={() =>
                        setAggregation(aggregation === "absolute" ? "relative" : "absolute")}
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
