import React, { useMemo } from "react"
// import { Table, Simple, Icon, Tag } from "@perfolio/ui/components"
import { Table, Cell, Tooltip, Description } from "@perfolio/ui/components"
import { format } from "@perfolio/util/numbers"
import {
  useGetPortfolioHistoryQuery,
  useGetTransactionsQuery,
  ValueAndQuantityAtTime,
} from "@perfolio/api/graphql"
import { useUser } from "@clerk/clerk-react"

export interface AssetTableProps {
  aggregation: "Absolute" | "Relative"
}

export const AssetTable: React.FC<AssetTableProps> = ({ aggregation }): JSX.Element => {
  const user = useUser()
  const portfolioHistoryResponse = useGetPortfolioHistoryQuery({ variables: { userId: user.id } })
  const portfolioHistory = portfolioHistoryResponse.data?.getPortfolioHistory
  const transactionsResponse = useGetTransactionsQuery({ variables: { userId: user.id } })
  const transactions = transactionsResponse.data?.getTransactions

  const costPerShare: { [assetId: string]: number } = useMemo(() => {
    const transactionsFIFO: { [assetId: string]: number[] } = {}
    transactions?.forEach((tx) => {
      if (!transactionsFIFO[tx.asset.id]) {
        transactionsFIFO[tx.asset.id] = []
      }

      if (tx.volume > 0) {
        for (let i = 0; i < tx.volume; i++) {
          transactionsFIFO[tx.asset.id].push(tx.value)
        }
      } else {
        for (let i = 0; i < tx.volume; i++) {
          transactionsFIFO[tx.asset.id].shift()
        }
      }
    })

    const costPerShare: { [assetId: string]: number } = {}
    Object.entries(transactionsFIFO).forEach(([assetId, values]) => {
      costPerShare[assetId] = values.reduce((acc, value) => acc + value, 0) / values.length
    })
    return costPerShare
  }, [transactions])

  const portfolio = React.useMemo(() => {
    const getLastValid = (
      history: ValueAndQuantityAtTime[],
    ): { quantity: number; value: number } => {
      const sorted = [...history].sort((a, b) => a.time - b.time)

      for (const day of sorted) {
        if (day.value > 0) {
          return day
        }
      }
      throw new Error("Nothing found")
    }

    return portfolioHistory?.map((h) => {
      return {
        asset: {
          logo: h.asset.company?.logo ?? "",
          name: h.asset.company?.name ?? "",
          id: h.asset.id,
        },
        ...getLastValid(h.history),
      }
    })
  }, [portfolioHistory])

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
      data={[...(portfolio ?? [])]
        /**
         * Sort by total value descending
         * The largest position is at the top of the table
         */
        .sort((a, b) => b.quantity * b.value - a.quantity * a.value)
        .map((holding) => {
          if (!holding?.asset) {
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
                src={holding.asset.company?.logo ?? "Null"}
                title={holding.asset.company?.name ?? "Null"}
                subtitle={holding.asset.company?.id ?? "Null"}
              />
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
              <Cell.Text align="text-right">
                {aggregation === "Absolute"
                  ? format((holding.value - costPerShare[holding.asset.id]) * holding.quantity, {
                      suffix: "€",
                      sign: true,
                    })
                  : format(holding.value / costPerShare[holding.asset.id] - 1, {
                      percent: true,
                      suffix: "%",
                      sign: true,
                    })}
              </Cell.Text>
            ),
          }
        })}
    />
  )
}
