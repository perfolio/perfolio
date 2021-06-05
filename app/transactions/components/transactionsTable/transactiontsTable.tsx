import React from "react"
import { Time } from "app/time"
import { Table, Spinner } from "app/core/components"
import { Simple } from "app/core/components/table/cells/simple/simple"
import { Icon } from "app/core/components/table/cells/icon/icon"
import { Transaction } from "db"
import { Image, invalidateQuery, useMutation } from "blitz"
import getTransactions from "app/transactions/queries/getTransactions"
import deleteTransactionMutation from "app/transactions/mutations/deleteTransaction"
import { useSymbol } from "app/companies/hooks/useSymbol"
import { useCompany } from "app/companies/hooks/useCompany"
import { useCurrentPrice } from "app/prices/hooks/useCurrentPrice"
import { Button } from "app/core/components/table/cells/button/button"
import { XIcon } from "@heroicons/react/outline"
import { useTransactions } from "app/transactions/hooks/useTransactions"
const Row: React.FC<{ tx: Transaction }> = ({ tx }) => {
  const [symbol] = useSymbol(tx.data.assetId)

  const [company] = useCompany(symbol?.data.symbol)
  const [currentPrice, { isLoading: currentPriceLoading }] = useCurrentPrice(
    symbol?.data.symbol,
  )

  const [deleteTransaction] = useMutation(deleteTransactionMutation, {
    onSuccess: () => invalidateQuery(getTransactions),
  })

  return (
    <tr>
      <td className="text-left">
        <Icon
          label={symbol?.data.symbol.toUpperCase()}
          content={company?.data.name ?? <div className="w-16"></div>}
          align="justify-start"
          icon={
            !company ? (
              <Spinner />
            ) : (
              <Image
                alt={`Logo of ${company.data.name}`}
                className="rounded-full"
                src={company.data.logo}
                width={64}
                height={64}
              />
            )
          }
        />
      </td>
      <td className="font-mono text-right">
        <Simple label={tx.data.volume.toFixed(2)} />
      </td>
      <td className="font-mono text-right">
        <Simple label={`$${tx.data.value.toFixed(2)}`} />
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
          label={Time.fromTimestamp(tx.data.executedAt)
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
  const [transactions] = useTransactions()

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
