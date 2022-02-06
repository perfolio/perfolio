import { DocumentAddIcon } from "@heroicons/react/outline"
import { ExchangeTradedAsset } from "@perfolio/pkg/api"
import { Transaction } from "@perfolio/pkg/api"
import { useDeleteTransaction, usePortfolio } from "@perfolio/pkg/hooks"
import fs from "fs"
import { useI18n } from "next-localization"

import { useToaster } from "@perfolio/pkg/toaster"
import { ActivityFeed, AppLayout, Main, Sidebar } from "@perfolio/ui/app"
import { Button, Text } from "@perfolio/ui/components"
import { Loading } from "@perfolio/ui/components"
import { Avatar, Description } from "@perfolio/ui/components"
import { EmptyState } from "@perfolio/ui/components/emptyState"
import classNames from "classnames"
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import { GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"

export interface TransactionItemProps {
  transaction: Omit<Transaction, "portfolioId">
  isLast: boolean
}

const TransactionItem: React.FC<TransactionItemProps> = ({ isLast, transaction }): JSX.Element => {
  const { t } = useI18n()
  const { addToast } = useToaster()

  const deleteTransaction = useDeleteTransaction()

  const asset = transaction.asset as ExchangeTradedAsset

  return (
    <div className="w-full md:flex">
      <div className="md:w-1/4 lg:w-1/5 xl:w-1/6">
        <div className="relative h-full pb-4 border-gray-300 md:border-r dark:border-gray-600 md:pb-0 md:pt-2">
          <div className="flex items-center justify-between w-full md:justify-end">
            <span className="text-gray-600 flexfont-medium md:pr-8 dark:text-blueGray-200 md:font-normal ">
              {new Date(transaction.executedAt * 1000).toLocaleDateString()}
            </span>
            <div className="items-center justify-center hidden w-8 h-8 bg-white dark:text-black text-primary-dark dark:bg-primary-green md:inline-flex md:absolute md:-right-4">
              {asset.logo ? <Avatar size="sm" src={asset.logo} /> : <Loading />}
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
        <div className="flex grow gap-4">
          {transaction.asset ? (
            <Description title={transaction.asset.name}>
              {`You ${
                transaction.volume > 0 ? t("app.transIndexInfoBought") : t("app.transIndexInfoSold")
              } ${Math.abs(transaction.volume).toFixed(2)} share${
                transaction.volume === 1 ? "" : "s"
              } of ${asset.ticker} at $${transaction.value.toFixed(2)} per share`}
            </Description>
          ) : null}
        </div>
        <div className="shrink-0">
          <Button
            type="secondary"
            size="sm"
            onClick={async () => {
              await deleteTransaction.mutateAsync({
                transactionId: transaction.id,
              })
              addToast({
                title: t("app.transIndexToastTitle"),
                content: t("app.transIndexToastContent") + `${transaction.id}`,
              })
            }}
          >
            {t("app.transIndexDeleteButton")}
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * / page.
 */

interface PageProps {}

const TransactionsPage: NextPage<PageProps> = () => {
  const { t } = useI18n()
  const router = useRouter()
  const { portfolio, isLoading, error } = usePortfolio()
  return (
    <AppLayout
      sidebar={
        <Sidebar>
          <ActivityFeed />
        </Sidebar>
      }
    >
      <Main>
        <Main.Header>
          <Main.Header.Title title={t("app.transIndexHeader")} />
        </Main.Header>
        <Main.Content>
          {error ? <div>{JSON.stringify(error)}</div> : null}
          {isLoading ? (
            <Loading />
          ) : !portfolio?.transactions || portfolio.transactions.length === 0 ? (
            <EmptyState
              href={`/portfolio/${router.query["portfolioId"]}/transactions/new`}
              icon={<DocumentAddIcon />}
            >
              <Text>Add your first transaction</Text>
            </EmptyState>
          ) : (
            <AnimateSharedLayout>
              <AnimatePresence>
                {[...portfolio.transactions]
                  .sort((a, b) => b.executedAt - a.executedAt)
                  ?.map((tx, i) => (
                    <motion.div
                      layout
                      key={tx.id}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 50,
                        mass: 1,
                      }}
                    >
                      <TransactionItem
                        key={tx.id}
                        transaction={tx}
                        isLast={i === portfolio.transactions.length - 1}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </AnimateSharedLayout>
          )}
        </Main.Content>
      </Main>
    </AppLayout>
  )
}

export default TransactionsPage

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  return {
    props: {
      translations: JSON.parse(
        fs.readFileSync(`${process.cwd()}/public/locales/${locale}.json`).toString(),
      ),
    },
  }
}
