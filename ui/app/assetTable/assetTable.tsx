import React, { useMemo } from "react"
import { Table, Cell, Tooltip, Description } from "@perfolio/ui/components"
import { format } from "@perfolio/pkg/util/numbers"
import { useCurrentPorfolioState, usePortfolio } from "@perfolio/pkg/hooks"
import { useI18n } from "@perfolio/pkg/i18n"

export interface AssetTableProps {
  aggregation: "absolute" | "relative"
}

export const AssetTable: React.FC<AssetTableProps> = ({ aggregation }): JSX.Element => {
  const { portfolio } = usePortfolio()
  const { t } = useI18n()

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
  const totalValue = (currentPorfolioState ?? []).reduce(
    (acc, { value, quantity }) => acc + value * quantity,
    0,
  )

  return (
    <Table<"asset" | "chart" | "quantity" | "costPerShare" | "pricePerShare" | "change">
      columns={[
        {
          Header: t("assetTableAssetHeader"),
          accessor: "asset",
          align: "text-left",
        },
        {
          Header: t("assetTableWeightHeader"),
          accessor: "chart",
          tooltip: (
            <Tooltip>
              <Description title={t("assetTableWeightHeader")}>
                {/* TODO: replace by localisation var */}
                The percentage share of the asset in the total portfolio
              </Description>
            </Tooltip>
          ),
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
          const change =
            aggregation === "absolute"
              ? (holding.value - costPerShare[holding.asset.id]!) * holding.quantity
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
            chart: (
              <Cell.Text align="text-right">
                {format(weight, { percent: true, suffix: "%" })}
              </Cell.Text>
            ),
            quantity: <Cell.Text align="text-right">{format(holding.quantity)}</Cell.Text>,
            costPerShare: (
              <Cell.Text align="text-right">
                {format(costPerShare[holding.asset.id], { suffix: "€" })}
              </Cell.Text>
            ),
            pricePerShare: (
              <Cell.Text align="text-right">{format(holding.value, { suffix: "€" })}</Cell.Text>
            ),
            change: (
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
            ),
          }
        })}
    />
  )
}
