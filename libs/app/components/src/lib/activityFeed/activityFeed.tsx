import { useSymbolFromFigi, useTransactions } from "@perfolio/data-access/queries"
import { Transaction } from "@perfolio/data-access/db"
import { Time } from "@perfolio/util/time"
import React from "react"
import { Loading, Text } from "@perfolio/ui/components"
import cn from "classnames"
interface TransactionActivityItemProps {
  transaction: Transaction
  isFirst?: boolean
}

const TransactionActivityItem: React.FC<TransactionActivityItemProps> = ({
  transaction,
  isFirst,
}): JSX.Element => {
  const { symbol, isLoading } = useSymbolFromFigi({
    figi: transaction.data.assetId,
  })

  return (
    <li
      className={cn(" py-4", {
        "border-t border-gray-100": !isFirst,
      })}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Text size="sm" bold>
              New Transaction
            </Text>
            <Text size="xs">{Time.ago(transaction.data.executedAt)}</Text>
          </div>
          <Text size="sm">
            You {transaction.data.volume > 0 ? "bought" : "sold"} {transaction.data.volume}{" "}
            <span className="font-semibold">{symbol}</span> shares at ${transaction.data.value} per
            share.
          </Text>
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
      <ul>
        {last5Transactions?.map((tx, i) => (
          <TransactionActivityItem key={tx.id} transaction={tx} isFirst={i === 0} />
        ))}
      </ul>
    </>
  )
}
