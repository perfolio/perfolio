import React from "react"
import { AsyncButton, Button } from "@perfolio/ui/components"
import { Loading } from "@perfolio/ui/components"
import { NextPage, GetServerSideProps } from "next"
import { ExchangeTradedAsset } from "@perfolio/api/graphql"
import classNames from "classnames"
import { AppLayout, ActivityFeed, Main, Sidebar } from "@perfolio/app/components"
import { Avatar, Description } from "@perfolio/ui/components"
import { Transaction } from "@perfolio/api/graphql"
import { useToaster } from "@perfolio/toaster"
import { useDeleteTransaction, useExchangeTradedAsset, usePortfolio } from "@perfolio/hooks"
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
} from ".pnpm/framer-motion@4.1.17_react-dom@17.0.2+react@17.0.2/node_modules/framer-motion"
import { getTranslations, useI18n } from "@perfolio/feature/i18n"
import router from "next/router"
import { withAuthenticationRequired } from "@auth0/auth0-react"

export interface TransactionItemProps {
  transaction: Omit<Transaction, "assetId">
  isLast: boolean
}

const TransactionItem: React.FC<TransactionItemProps> = ({ isLast, transaction }): JSX.Element => {
  const { t } = useI18n()
  const { addToast } = useToaster()
  const { asset } = useExchangeTradedAsset({
    id: transaction.asset.id,
  })
  const deleteTransaction = useDeleteTransaction()

  return (
    <div className="w-full md:flex">
      <div className="md:w-1/4 lg:w-1/5 xl:w-1/6">
        <div className="relative h-full pb-4 border-gray-300 md:border-r dark:border-gray-600 md:pb-0 md:pt-2">
          <div className="flex items-center justify-between w-full md:justify-end">
            <span className="text-gray-600 flexfont-medium md:pr-8 dark:text-blueGray-200 md:font-normal ">
              {new Date(transaction.executedAt * 1000).toLocaleDateString()}
            </span>
            <div className="items-center justify-center hidden w-8 h-8 bg-white dark:text-black text-primary-dark dark:bg-primary-green md:inline-flex md:absolute md:-right-4">
              {asset?.logo ? <Avatar size="sm" src={asset.logo} /> : <Loading />}
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
          {asset ? (
            <Description title={asset.name}>
              {`You ${
                transaction.volume > 0 ? t("transIndexInfoBought") : t("transIndexInfoSold")
              } ${Math.abs(transaction.volume).toFixed(2)} share${
                transaction.volume === 1 ? "" : "s"
              } of ${asset.ticker} at $${transaction.value.toFixed(2)} per share`}
            </Description>
          ) : null}
        </div>
        <div className="flex-shrink-0">
          <AsyncButton
            kind="secondary"
            size="sm"
            onClick={async () => {
              await deleteTransaction.mutateAsync({ transactionId: transaction.id })
              addToast({
                title: t("transIndexToastTitle"),
                content: t("transIndexToastContent") + `${transaction.id}`,
              })
            }}
          >
            {t("transIndexDeleteButton")}
          </AsyncButton>
        </div>
      </div>
    </div>
  )
}

/**
 * / page.
 */

interface PageProps {
  translations: Record<string, string>
}

const TransactionsPage: NextPage<PageProps> = ({ translations }) => {
  const { t } = useI18n(translations)

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
          <Main.Header.Title title={t("transIndexHeader")} />
        </Main.Header>
        <Main.Content>
          {error ? <div>{JSON.stringify(error)}</div> : null}
          {isLoading ? (
            <Loading />
          ) : !portfolio?.transactions || portfolio.transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-gray-700">{t("transIndexNoTrans")}</p>
              <Button
                size="lg"
                kind="primary"
                href={`/portfolio/${router.query.portfolioId}/transactions/new`}
              >
                {t("transIndexAddTrans")}
              </Button>
            </div>
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
                      transition={{ type: "spring", stiffness: 500, damping: 50, mass: 1 }}
                    >
                      <TransactionItem
                        key={tx.id}
                        transaction={{ ...tx, asset: tx.asset as ExchangeTradedAsset }}
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

export default withAuthenticationRequired(TransactionsPage)

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ locale }) => {
  const translations = getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
