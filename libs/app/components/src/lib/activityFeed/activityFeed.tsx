import { Transaction } from "@perfolio/api/graphql"
import { Time } from "@perfolio/util/time"
import React from "react"
import { Loading, Text } from "@perfolio/ui/components"
import cn from "classnames"
import { useTransactions, useExchangeTradedAsset } from "@perfolio/hooks"

interface TransactionActivityItemProps {
  transaction: Omit<Transaction, "userId" | "assetId">
  isFirst?: boolean
}

const TransactionActivityItem: React.FC<TransactionActivityItemProps> = ({
  transaction,
  isFirst,
}): JSX.Element => {
  const { asset, isLoading } = useExchangeTradedAsset({
    id: transaction.asset.id,
  })
  return (
    <li
      className={cn(" py-4", {
        "border-t border-gray-100": !isFirst,
      })}
    >
      {isLoading || !asset ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Text size="sm" bold>
              New Transaction
            </Text>
            <Text size="xs">{Time.ago(transaction.executedAt)}</Text>
          </div>
          <Text size="sm">
            You {transaction.volume > 0 ? "bought" : "sold"} {transaction.volume}{" "}
            <span className="font-semibold">{asset.ticker}</span> shares at ${transaction.value} per
            share.
          </Text>
        </>
      )}
    </li>
  )
}

export const ActivityFeed: React.FC = (): JSX.Element => {
  const { transactions } = useTransactions()
  const last5Transactions = transactions
    ? [...transactions].sort((a, b) => b.executedAt - a.executedAt).slice(0, 5)
    : []

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
