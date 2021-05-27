import { useCompany } from "app/companies/hooks/useCompany"
import { useTransactions } from "app/transactions/hooks/useTransactions"
import { Transaction } from "db"
import { Time } from "pkg/time"
import React from "react"
import { Spinner } from "../spinner/spinner"

interface TransactionActivityItemProps {
  transaction: Transaction
}

const TransactionActivityItem: React.FC<TransactionActivityItemProps> = ({
  transaction,
}): JSX.Element => {
  const { company, companyLoading } = useCompany(transaction.assetId)

  return (
    <li className="py-4 h-28">
      {companyLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-black">New Transaction</span>
            <span className="text-xs">{Time.ago(transaction.executedAt)}</span>
          </div>
          <p>
            You {transaction.volume > 0 ? "bought" : "sold"} {transaction.volume}{" "}
            <span className="font-semibold">{company?.symbol}</span> shares at ${transaction.value}{" "}
            per share.
          </p>
        </>
      )}
    </li>
  )
}

export const ActivityFeed: React.FC = (): JSX.Element => {
  const { transactions } = useTransactions()

  const last3Transactions = (transactions ?? [])
    .sort((a, b) => b.executedAt - a.executedAt)
    .slice(0, 3)

  return (
    <>
      <p className="text-base font-semibold text-gray-800">Recent Activity</p>
      <ul className="mt-4 text-sm text-gray-700 divide-y divide-gray-300">
        {last3Transactions?.map((tx) => (
          <TransactionActivityItem key={tx.id} transaction={tx} />
        ))}
      </ul>
    </>
  )
}
