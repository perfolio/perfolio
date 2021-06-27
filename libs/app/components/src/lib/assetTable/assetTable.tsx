import React, { useMemo } from "react"
// import { Table, Simple, Icon, Tag } from "@perfolio/ui/components"
import { Table, Cell, Tooltip, Description } from "@perfolio/ui/design-system"
import { usePortfolio, useTransactions } from "@perfolio/data-access/queries"

export const AssetTable = (): JSX.Element => {
  const { portfolio } = usePortfolio()
  const { transactions } = useTransactions()

  const costPerShare: { [assetId: string]: number } = useMemo(() => {
    const transactionsFIFO: { [assetId: string]: number[] } = {}
    transactions?.forEach(({ data }) => {
      if (!transactionsFIFO[data.assetId]) {
        transactionsFIFO[data.assetId] = []
      }

      if (data.volume > 0) {
        for (let i = 0; i < data.volume; i++) {
          transactionsFIFO[data.assetId].push(data.value)
        }
      } else {
        for (let i = 0; i < data.volume; i++) {
          transactionsFIFO[data.assetId].shift()
        }
      }
    })

    const costPerShare: { [assetId: string]: number } = {}
    Object.entries(transactionsFIFO).forEach(([assetId, values]) => {
      costPerShare[assetId] = values.reduce((acc, value) => acc + value, 0) / values.length
    })
    return costPerShare
  }, [transactions])

  return (
    <Table<"asset" | "quantity" | "costPerShare" | "pricePerShare" | "change">
      columns={[
        {
          Header: "Asset",
          accessor: "asset",
          align: "text-left",
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
              <Description title="TODO:">@webersni</Description>
            </Tooltip>
          ),
        },
        {
          Header: "Price per share",
          accessor: "pricePerShare",
          align: "text-right",
        },
        {
          Header: "Change",
          accessor: "change",
          align: "text-right",
        },
      ]}
      data={Object.entries(portfolio).map(([assetId, asset]) => {
        if (!asset?.company) {
          return {
            asset: <Cell.Loading />,
            quantity: <Cell.Loading />,
            costPerShare: <Cell.Loading />,
            pricePerShare: <Cell.Loading />,
            change: <Cell.Loading />,
          }
        }
        return {
          asset: (
            <Cell.Profile
              src={asset.company.logo}
              title={asset.company.symbol}
              subtitle={asset.company.name ?? undefined}
            />
          ),
          quantity: <Cell.Text align="text-right">{asset.quantity.toFixed(2)}</Cell.Text>,
          costPerShare: (
            <Cell.Text align="text-right">{costPerShare[assetId]?.toFixed(2)}€</Cell.Text>
          ),
          pricePerShare: <Cell.Text align="text-right">{asset.value.toFixed(2)}€</Cell.Text>,
          change: <Cell.Text align="text-right">TODO:</Cell.Text>,
        }
      })}
    />
  )
}
