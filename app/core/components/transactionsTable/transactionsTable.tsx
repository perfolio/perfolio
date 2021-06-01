import React from "react"
import { Table } from "../table/table"
import { Simple } from "../table/cells/simple/simple"
import { Icon } from "../table/cells/icon/icon"
import { Transaction } from ".prisma/client"
import { Spinner } from "../spinner/spinner"
import { invalidateQuery, useMutation } from "blitz"
import { Time } from "pkg/time"
import getTransactions from "app/transactions/queries/getTransactions"
import deleteTransactionMutation from "app/transactions/mutations/deleteTransaction"
import { useSymbol } from "app/companies/hooks/useSymbol"
import { useCompany } from "app/companies/hooks/useCompany"
import { useCurrentPrice } from "app/prices/hooks/useCurrentPrice"
import { Button } from "../table/cells/button/button"
import { XIcon } from "@heroicons/react/outline"
import { useTransactions } from "app/transactions/hooks/useTransactions"
const Row: React.FC<{ tx: Transaction }> = ({ tx }) => {
  const { symbol } = useSymbol(tx.assetId)

  const { company, isLoading: companyLoading } = useCompany(symbol?.symbol)
  const { currentPrice, isLoading: currentPriceLoading } = useCurrentPrice(
    symbol?.symbol,
  )

  const [deleteTransaction] = useMutation(deleteTransactionMutation, {
    onSuccess: () => invalidateQuery(getTransactions),
  })

  return (
    <tr>
      <td className="text-left">
        <Icon
          label={symbol?.symbol.toUpperCase()}
          content={company?.name ?? <div className="w-16"></div>}
          align="justify-start"
          icon={
            companyLoading ? (
              <Spinner />
            ) : (
              <img
                alt={`Logo of ${company?.name}`}
                className="rounded-full"
                src={company?.logo ?? ""}
                width={64}
                height={64}
              />
            )
          }
        />
      </td>
      <td className="font-mono text-right">
        <Simple label={tx.volume.toFixed(2)} />
      </td>
      <td className="font-mono text-right">
        <Simple label={`$${tx.value.toFixed(2)}`} />
      </td>
      <td className="font-mono text-right">
        <Simple
          label={
            currentPriceLoading ? <Spinner /> : `$${currentPrice?.toFixed(2)}`
          }
        />
      </td>
      <td className="font-mono text-right ">
        <Simple
          label={Time.fromTimestamp(tx.executedAt)
            .toDate()
            .toLocaleDateString()}
        />
      </td>
      <td className="font-mono text-right ">
        <Button
          color="text-error-500"
          icon={<XIcon />}
          onClick={() => {
            deleteTransaction({ transactionId: tx.id })
          }}
        />
      </td>
    </tr>
  )
}

export const TransactionsTable = (): JSX.Element => {
  const { transactions } = useTransactions()

  const columnNames = [
    "Asset",
    "Volume",
    "Purchase cost",
    "Current value",
    "Execution Date",
    "",
  ]

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
