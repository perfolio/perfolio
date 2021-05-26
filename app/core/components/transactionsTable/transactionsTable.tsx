import React from "react"
import { Table } from "../table/table"
import { Simple } from "../table/cells/simple/simple"
import { Icon } from "../table/cells/icon/icon"
import { Transaction } from ".prisma/client"
import { Spinner } from "../spinner/spinner"
import { useQuery } from "blitz"
import { Time } from "pkg/time"
import getTransactions from "app/transactions/queries/getTransactions"
import getCompany from "app/companies/queries/getCompany"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getCurrentPrice from "app/prices/queries/getCurrentPrice"

const Row: React.FC<{ tx: Transaction }> = ({ tx }) => {
  const [company, { isLoading: companyLoading }] = useQuery(
    getCompany,
    {
      isin: tx.assetId,
    },
    { enabled: !!tx, suspense: false },
  )

  const [currentPrice, { isLoading: priceLoading }] = useQuery(
    getCurrentPrice,
    {
      isin: tx.assetId,
    },
    {
      enabled: !!tx,
      suspense: false,
    },
  )

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
              <img alt={`Logo of ${company?.name}`} className="rounded-full" src={company?.logo} />
            )
          }
        />
      </td>
      <td className="font-mono text-right">
        <Simple label={tx.quantity.toFixed(2)} />
      </td>
      <td className="font-mono text-right">
        <Simple label={`$${tx.value.toFixed(2)}`} />
      </td>
      <td className="font-mono text-right">
        <Simple label={priceLoading ? <Spinner /> : `$${currentPrice?.value.toFixed(2)}`} />
      </td>
      <td className="font-mono text-right ">
        <Simple label={Time.fromTimestamp(tx.executedAt).toDate().toLocaleDateString()} />
      </td>
    </tr>
  )
}

export const TransactionsTable = (): JSX.Element => {
  const user = useCurrentUser()
  const [transactions] = useQuery(
    getTransactions,
    { userId: user!.id },
    { enabled: !!user, suspense: false },
  )

  const columnNames = ["Asset", "Quantity", "Purchase cost", "Current value", "Execution Date"]

  const rows =
    transactions?.map((tx) => {
      return <Row key={tx.id} tx={tx} />
    }) ?? []
  return (
    <div>
      <Table columnNames={columnNames} rows={rows} />
    </div>
  )
}
