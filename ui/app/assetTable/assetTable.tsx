import { useCurrentPorfolioState, usePortfolio } from "@perfolio/pkg/hooks"
import { useI18n } from "@perfolio/pkg/i18n"
import { format } from "@perfolio/pkg/util/numbers"
import { Avatar, Cell, Description, Drawer, Heading, Table, Text, Tooltip } from "@perfolio/ui/components"
import React, { useMemo, useState } from "react"
import cn from "classnames"

export interface AssetTableProps {
  aggregation: "absolute" | "relative"
}

export const AssetTable: React.FC<AssetTableProps> = ({
  aggregation,
}): JSX.Element => {
  const { portfolio } = usePortfolio()
  const { t } = useI18n()
  const [displayAggregation, setDisplayAggregation] = useState(aggregation)

  const costPerShare: { [assetId: string]: number } = useMemo(() => {
    const transactionsFIFO: { [assetId: string]: number[] } = {}
    portfolio?.transactions?.forEach((tx) => {
      if (!transactionsFIFO[tx.asset.id]) {
        transactionsFIFO[tx.asset.id] = []
      }

      if (tx.volume > 0) {
        for (let i = 0; i < tx.volume; i++) {
          transactionsFIFO[tx.asset.id]!.push(tx.value)
        }
      } else {
        for (let i = 0; i < tx.volume; i++) {
          transactionsFIFO[tx.asset.id]!.shift()
        }
      }
    })

    const costPerShare: { [assetId: string]: number } = {}
    Object.entries(transactionsFIFO).forEach(([assetId, values]) => {
      costPerShare[assetId] = values.reduce((acc, value) => acc + value, 0) / values.length
    })
    return costPerShare
  }, [portfolio?.transactions])

  const { currentPorfolioState } = useCurrentPorfolioState()
  console.log({ currentPorfolioState })
  const totalValue = (currentPorfolioState ?? []).reduce(
    (acc, { value, quantity }) => acc + (value ?? 0) * quantity,
    0,
  )

  return (
    <>
      <div className="hidden sm:flex">
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
              Header: t("assetTableAssetHeader"),
              accessor: "asset",
              align: "text-left",
            },
            {
              Header: t("assetTableWeightHeader"),
              accessor: "weight",
            },
            {
              Header: t("assetTableQuantHeader"),
              accessor: "quantity",
              align: "text-right",
            },
            {
              Header: t("assetTableCostHeader"),
              accessor: "costPerShare",
              align: "text-right",
              tooltip: (
                <Tooltip>
                  <Description title={t("assetTableCostToolTitle")}>
                    {t("assetTableCostToolDescr")}
                  </Description>
                </Tooltip>
              ),
            },
            {
              Header: t("assetTablePriceHeader"),
              accessor: "pricePerShare",
              align: "text-right",
            },
            {
              Header: "Total Value",
              accessor: "totalValue",
              align: "text-right",
            },
            {
              Header: t("assetTableChangeHeader"),
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
              const change = displayAggregation === "absolute"
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
                        {holding.asset.name} {t("assetTableComposition1")}{" "}
                        {format(weight, { percent: true, suffix: "%" })} {t("assetTableComposition2")}
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
                  <Cell.Tag
                    align="text-right"
                    textColor={change > 0 ? "text-success-dark" : "text-error-dark"}
                    bgColor={change > 0 ? "bg-success-light" : "bg-error-light"}
                  >
                    <span onClick={() => setDisplayAggregation(displayAggregation === "absolute" ? "relative" : "absolute")}>
                      {format(
                        change,
                        displayAggregation === "absolute"
                          ? { suffix: "€", sign: true }
                          : { percent: true, suffix: "%", sign: true },
                      )}
                    </span>
                  </Cell.Tag>
                ),
              }
            })}
        />
      </div>
      <div className="flex sm:hidden">
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
                  displayAggregation === "absolute"
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
                    <div className="w-full flex px-2 pb-4 sm:px-6 justify-between">
                      <div className="flex w-full content-start space-x-2">
                        <div className="w-8 h-8 self-center">
                          <Avatar size="sm" src={holding.asset.logo} />
                        </div>
                        <div>
                          <Text bold truncate>{holding.asset.name}</Text>
                          <div className="w-full flex space-x-2 justify-start">
                            <div className="bg-gray-200 self-center px-1 rounded">
                              <Text size="sm">{format(holding.quantity, { prefix: "x " })}</Text>
                            </div>
                            <Text>{format(holding.value * holding.quantity, { suffix: " €" })}</Text>
                          </div>
                        </div>
                      </div>
                      <div
                        className={cn(
                          change > 0 ? "text-success-dark" : "text-error-dark",
                          change > 0 ? "bg-success-light" : "bg-error-light",
                          "self-center px-1 rounded",
                        )}
                        onClick={() => setDisplayAggregation(displayAggregation === "absolute" ? "relative" : "absolute")}
                      >
                        {format(
                          change,
                          displayAggregation === "absolute"
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
    </>
  )
}
