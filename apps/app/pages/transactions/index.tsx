import React from "react"
import { AsyncButton, Button, Spinner } from "@perfolio/ui/components"
import { ActivityFeed, MainCard } from "../../components"
import { NextPage } from "next"
import { useCompany, useTransactions } from "../../queries"
import { Transaction } from "@perfolio/data-access/db"
import { useDeleteTransaction } from "../../mutations"
import { useAsset } from "../../queries"
import classNames from "classnames"
import { WithSidebar, withAuthentication } from "../../components"
import { Avatar, Description } from "@perfolio/ui/design-system"
export interface TransactionItemProps {
  transaction: Transaction
  isLast: boolean
}

const TransactionItem: React.FC<TransactionItemProps> = ({ isLast, transaction }): JSX.Element => {
  const { asset } = useAsset({ isin: transaction.data.assetId })
  const { company } = useCompany(asset?.data.symbol)
  const { mutateAsync: deleteTransaction } = useDeleteTransaction()

  return (
    <div className="w-full md:flex">
      <div className="md:w-1/4 lg:w-1/5 xl:w-1/6">
        <div className="relative h-full pb-4 border-gray-300 md:border-r dark:border-gray-600 md:pb-0 md:pt-2">
          <div className="flex items-center justify-between w-full md:justify-end">
            <span className="text-gray-600 flexfont-medium md:pr-8 dark:text-blueGray-200 md:font-normal ">
              {new Date(transaction.data.executedAt * 1000).toLocaleDateString()}
            </span>
            <div className="items-center justify-center hidden w-8 h-8 bg-white dark:text-black text-primary-900 dark:bg-primary-green md:inline-flex md:absolute md:-right-4">
              {company?.logo ? (
                <Avatar
                  size="small"
                  src={company.logo}
                  alt={`Logo of ${transaction.data.assetId}`}
                />
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "flex items-center justify-between w-full md:ml-8 md:w-3/4 lg:w-4/5 xl:w-5/6",
          {
            "border-b pb-4 mb-4 border-gray-200": !isLast,
          },
        )}
      >
        <div className="flex flex-grow gap-4">
          <Description title={company?.symbol}>
            {`You ${transaction.data.volume > 0 ? "bought" : "sold"} ${Math.abs(
              transaction.data.volume,
            ).toFixed(2)} shares of ${
              transaction.data.assetId
            } at $${transaction.data.value.toFixed(2)} per share`}
          </Description>
        </div>
        <div className="flex-shrink-0">
          <AsyncButton
            kind="secondary"
            size="small"
            label="Delete"
            onClick={async () => {
              await deleteTransaction({ transactionId: transaction.id })
            }}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * / page.
 */
const TransactionsPage: NextPage = () => {
  const { transactions, isLoading } = useTransactions()
  return (
    <WithSidebar sidebar={<ActivityFeed />}>
      <MainCard title="My Transactions">
        {isLoading ? (
          <Spinner />
        ) : !transactions || transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-gray-700">Looks like you don't have any transactions yet</p>
            <Button size="large" label="Add transaction" kind="primary" href="/transactions/new" />
          </div>
        ) : (
          <div>
            {transactions
              .sort((a, b) => b.data.executedAt - a.data.executedAt)
              ?.map((tx, i) => (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  isLast={i === transactions.length - 1}
                />
              ))}
          </div>
        )}
      </MainCard>
    </WithSidebar>
  )
}

export default withAuthentication(TransactionsPage)
