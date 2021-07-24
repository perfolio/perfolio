import { useGetTransactionsQuery, Transaction, Stock, Asset } from "@perfolio/api/graphql"
import { Time } from "@perfolio/util/time"
import React from "react"
import { Text } from "@perfolio/ui/components"
import cn from "classnames"
import { useUser } from "@clerk/clerk-react"
interface TransactionActivityItemProps {
  transaction: Omit<Transaction, "userId">
  isFirst?: boolean
}

const isStock = (asset: Asset): asset is Stock => {
  return "ticker" in asset
}

const TransactionActivityItem: React.FC<TransactionActivityItemProps> = ({
  transaction,
  isFirst,
}): JSX.Element => {
  console.log({ transaction })
  return (
    <li
      className={cn(" py-4", {
        "border-t border-gray-100": !isFirst,
      })}
    >
      <div className="flex items-center justify-between">
        <Text size="sm" bold>
          New Transaction
        </Text>
        <Text size="xs">{Time.ago(transaction.executedAt)}</Text>
      </div>
      <Text size="sm">
        You {transaction.volume > 0 ? "bought" : "sold"} {transaction.volume}{" "}
        <span className="font-semibold">
          {!!transaction.asset && isStock(transaction.asset) ? transaction.asset.ticker : ""}
        </span>{" "}
        shares at ${transaction.value} per share.
      </Text>
    </li>
  )
}

export const ActivityFeed: React.FC = (): JSX.Element => {
  const user = useUser()
  const { data } = useGetTransactionsQuery({ variables: { userId: user.id } })
  const transactions = data?.getTransactions
  console.log({ transactions })
  const last5Transactions = transactions
    ? [...transactions].sort((a, b) => b.executedAt - a.executedAt).slice(0, 5)
    : []

  return (
    <>
      <p className="text-base font-semibold text-gray-800">Recent Activity</p>
      <ul>
        {last5Transactions?.map((tx, i) => (
          <TransactionActivityItem key={tx.id} transaction={tx as Transaction} isFirst={i === 0} />
        ))}
      </ul>
    </>
  )
}
