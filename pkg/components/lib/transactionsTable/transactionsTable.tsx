import React from "react"
import { Table } from "../table/table"
import { Simple } from "../table/cells/simple/simple"
import { Icon } from "../table/cells/icon/icon"
import { Transaction } from ".prisma/client"
import { useCompany, usePrice, useTransactions } from "pkg/hooks"
import { Spinner } from "../spinner/spinner"
import { Time } from "pkg/time"

const Row: React.FC<{ tx: Transaction }> = ({ tx }) => {
  const { data: company, isLoading: companyLoading } = useCompany({
    isin: tx.assetId,
  })

  const { data: cost, isLoading: costLoading } = usePrice({
    isin: tx.assetId,
    time: Time.fromTimestamp(tx.executedAt),
  })

  console.log(company)

  return (
    <tr>
      <td className="text-left">
        <Icon
          label={company?.symbol.toUpperCase()}
          content={company?.name ?? <div className="w-16"></div>}
          align="justify-start"
          icon={
            companyLoading ? (
              <Spinner />
            ) : (
              <img className="rounded-full" src={company?.logo} />
            )
          }
        />
      </td>
      <td className="font-mono text-right">
        <Simple label={tx.quantity.toFixed(2)} />
      </td>
      <td className="font-mono text-right">
        <Simple label={costLoading ? <Spinner /> : `$${cost?.toFixed(2)}`} />
      </td>
      <td className="font-mono text-right">
        <Simple label={`$${tx.value.toFixed(2)}`} />
      </td>
      <td className="font-mono text-right ">
        <Simple
          label={Time.fromTimestamp(tx.executedAt)
            .toDate()
            .toLocaleDateString()}
        />
      </td>
    </tr>
  )
}

export const TransactionsTable = (): JSX.Element => {
  const { data } = useTransactions()

  const columnNames = [
    "Asset",
    "Quantity",
    "Cost per share",
    "Price per share",
    "Execution Date",
  ]

  const rows =
    data?.map((tx) => {
      return <Row key={tx.id} tx={tx} />
    }) ?? []
  return (
    <div>
      <Table columnNames={columnNames} rows={rows} />
    </div>
  )
}
