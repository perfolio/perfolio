import { useCurrentPorfolioState } from "@perfolio/pkg/hooks"
import { format } from "@perfolio/pkg/util/numbers"
import { Cell, Description, Table, Text, Tooltip } from "@perfolio/ui/components"
import React from "react"
import { DetailAssetTableProps } from "./assetTable"


export const DesktopAssetTable: React.FC<DetailAssetTableProps> = ({
  aggregation,
  setAggregation,
  costPerShare,
  totalValue,
  //currentPortfolioState,
}): JSX.Element => {
  const { currentPorfolioState } = useCurrentPorfolioState()

  return (
      <Table<
        | "asset"
        | "weight"
        | "quantity"
        | "costPerShare"
        | "pricePerShare"
        | "totalValue"
        | "change"
      >
        columns={[
          {
            Header: "Asset",
            accessor: "asset",
            align: "text-left",
          },
          {
            Header: "Weight",
            accessor: "weight",
          },
          {
            Header: "Quantity",
            accessor: "quantity",
            align: "text-right",
          },
          {
            Header: "Cost per share",
            accessor: "costPerShare",
            align: "text-right",
            tooltip: (
              <Tooltip>
                <Description title="Cost per share">
                  The average cost you have to pay for a single portfolio position in a specified currency.
                </Description>
              </Tooltip>
            ),
          },
          {
            Header: "Price per share",
            accessor: "pricePerShare",
            align: "text-right",
          },
          {
            Header: "Total Value",
            accessor: "totalValue",
            align: "text-right",
          },
          {
            Header: "Change",
            accessor: "change",
            align: "text-right",
          },
        ]}
        data={(currentPorfolioState ?? [])
          /**
           * Sort by total value descending
           * The largest position is at the top of the table
           */
          .sort((a, b) => b.quantity * b.value - a.quantity * a.value)
          .map((holding) => {
            const change = aggregation === "absolute"
              ? (holding.value - costPerShare[holding.asset.id]!)
              * holding.quantity
              : holding.value / costPerShare[holding.asset.id]! - 1

            const weight = (holding.quantity * holding.value) / totalValue
            return {
              asset: (
                <Cell.Profile
                  src={holding.asset.logo}
                  title={holding.asset.name}
                  subtitle={holding.asset.ticker}
                />
              ),
              weight: (
                <Cell.Cell>
                  <Tooltip
                    asChild
                    trigger={
                      <div className="flex h-2 overflow-hidden rounded bg-primary-light">
                        <span
                          style={{ width: `${weight * 100}%` }}
                          className="flex w-full h-2 mb-4 overflow-hidden rounded bg-primary"
                        >
                        </span>
                      </div>
                    }
                  >
                    <Text>
                      {holding.asset.name} represents {format(weight, { percent: true, suffix: "%" })} of your portfolio.
                    </Text>
                  </Tooltip>
                </Cell.Cell>
              ),
              quantity: (
                <Cell.Text align="text-right">
                  {format(holding.quantity)}
                </Cell.Text>
              ),
              costPerShare: (
                <Cell.Text align="text-right">
                  {format(costPerShare[holding.asset.id], { suffix: "€" })}
                </Cell.Text>
              ),
              pricePerShare: (
                <Cell.Text align="text-right">
                  {format(holding.value, { suffix: "€" })}
                </Cell.Text>
              ),
              totalValue: (
                <Cell.Text align="text-right">
                  {format(holding.value * holding.quantity, { suffix: "€" })}
                </Cell.Text>
              ),
              change: (
                <button className="w-full" onClick={() => setAggregation(aggregation === "absolute" ? "relative" : "absolute")}>
                  <Cell.Tag
                    align="text-right"
                    textColor={change > 0 ? "text-success-dark" : "text-error-dark"}
                    bgColor={change > 0 ? "bg-success-light" : "bg-error-light"}
                  >
                    {format(
                      change,
                      aggregation === "absolute"
                        ? { suffix: "€", sign: true }
                        : { percent: true, suffix: "%", sign: true },
                    )}
                  </Cell.Tag>
                </button>

              ),
            }
          })}
      />
  )
}
