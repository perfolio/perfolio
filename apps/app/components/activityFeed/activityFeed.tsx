import { useAsset, useTransactions } from "../../queries"
import { Transaction } from "@perfolio/db"
import { Time } from "@perfolio/time"
import React from "react"
import { Spinner } from "@perfolio/components"

interface TransactionActivityItemProps {
  transaction: Transaction
}

const TransactionActivityItem: React.FC<TransactionActivityItemProps> = ({
  transaction,
}): JSX.Element => {
  const { asset, isLoading } = useAsset({
    isin: transaction.data.assetId,
  })

  return (
    <li className="py-4 h-28">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-black">New Transaction</span>
            <span className="text-xs">{Time.ago(transaction.data.executedAt)}</span>
          </div>
          <p>
            You {transaction.data.volume > 0 ? "bought" : "sold"} {transaction.data.volume}{" "}
            <span className="font-semibold">{asset?.data.symbol}</span> shares at $
            {transaction.data.value} per share.
          </p>
        </>
      )}
    </li>
  )
}

export const ActivityFeed: React.FC = (): JSX.Element => {
  const { transactions } = useTransactions()

  const last5Transactions = (transactions ?? [])
    .sort((a, b) => b.data.executedAt - a.data.executedAt)
    .slice(0, 5)

  return (
    <>
      <p className="text-base font-semibold text-gray-800">Recent Activity</p>
      <ul className="mt-4 text-sm text-gray-700 divide-y divide-gray-300">
        {last5Transactions?.map((tx) => (
          <TransactionActivityItem key={tx.id} transaction={tx} />
        ))}
      </ul>
    </>
  )
}
