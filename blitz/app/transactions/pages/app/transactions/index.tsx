import React from "react"
import {
  ActivityFeed,
  AsyncButton,
  Button,
  WithSidebar,
} from "app/core/components"
import { BlitzPage, Routes } from "@blitzjs/core"
import { useTransactions } from "app/transactions/hooks/useTransactions"
import { Transaction } from "db"
import { invalidateQuery, useMutation } from "blitz"
import getTransactions from "app/transactions/queries/getTransactions"
import deleteTransactionMutation from "app/transactions/mutations/deleteTransaction"
import { useSymbol } from "app/companies/hooks/useSymbol"
import { DocumentAddIcon, DocumentRemoveIcon } from "@heroicons/react/solid"
import classNames from "classnames"

export interface TransactionItemProps {
  transaction: Transaction
  isLast: boolean
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  isLast,
  transaction,
}): JSX.Element => {
  const { symbol } = useSymbol(transaction.data.assetId)

  const [deleteTransaction] = useMutation(deleteTransactionMutation, {
    onSuccess: () => invalidateQuery(getTransactions),
  })

  return (
    <div className="w-full md:flex">
      <div className="md:w-1/4 lg:w-1/5 xl:w-1/6">
        <div className="relative h-full pb-4 border-gray-300 md:border-r dark:border-gray-600 md:pb-0 md:pt-2">
          <div className="flex items-center justify-between w-full md:justify-end">
            <span className="pl-4 font-medium text-gray-600 border-l-4 md:pl-0 md:pr-8 border-primary-500 dark:text-blueGray-200 dark:border-secondary-500 md:font-normal md:border-l-0">
              {new Date(
                transaction.data.executedAt * 1000,
              ).toLocaleDateString()}
            </span>
            <div className="items-center justify-center hidden w-8 h-8 bg-white dark:text-black text-primary-900 dark:bg-primary-green md:inline-flex md:absolute md:-right-4">
              {transaction.data.volume > 0 ? (
                <DocumentAddIcon />
              ) : (
                <DocumentRemoveIcon />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "flex items-start justify-between w-full md:ml-8 md:w-3/4 lg:w-4/5 xl:w-5/6",
          {
            "border-b pb-4 mb-4 border-gray-200": !isLast,
          },
        )}
      >
        <div className="flex-grow">
          <h2 className="text-3xl font-semibold text-gray-900">
            {symbol?.data.symbol}
          </h2>
          <p className="text-gray-600">
            {`You ${transaction.data.volume > 0 ? "bought" : "sold"} ${Math.abs(
              transaction.data.volume,
            ).toFixed(2)} shares of ${
              transaction.data.assetId
            } at $${transaction.data.value.toFixed(2)} per share`}
          </p>
        </div>
        <div className="flex-shrink-0">
          <AsyncButton
            kind="secondary"
            size="small"
            label="Delete"
            onClick={() => deleteTransaction({ transactionId: transaction.id })}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * / page.
 */
const TransactionsPage: BlitzPage = () => {
  const { transactions } = useTransactions()
  return (
    <WithSidebar title="My Transactions" sidebar={<ActivityFeed />}>
      {!transactions || transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-gray-700">
            Looks like you don't have any transactions yet
          </p>
          <Button
            size="large"
            label="Add transaction"
            kind="primary"
            href={Routes.NewTransactionPage().pathname}
          />
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
    </WithSidebar>
  )
}

TransactionsPage.suppressFirstRenderFlicker = true
TransactionsPage.authenticate = { redirectTo: Routes.SigninPage().pathname }
export default TransactionsPage
