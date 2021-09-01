import { Transaction } from "@perfolio/api/graphql"
import { Time } from "@perfolio/util/time"
import React from "react"
import { Loading, Text } from "@perfolio/ui/components"
import cn from "classnames"
import { useTransactions, useExchangeTradedAsset } from "@perfolio/hooks"
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"
import { useI18n } from "@perfolio/feature/i18n"
interface TransactionActivityItemProps {
  transaction: Omit<Transaction, "userId" | "assetId">
  isFirst?: boolean
}

const TransactionActivityItem: React.FC<TransactionActivityItemProps> = ({
  transaction,
  isFirst,
}): JSX.Element => {
  const { t } = useI18n()
  const { asset, isLoading } = useExchangeTradedAsset({
    id: transaction.asset.id,
  })
  return (
    <div
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
              {t("activFeedNewTrans")}
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
    </div>
  )
}

export const ActivityFeed: React.FC = (): JSX.Element => {
  const { transactions } = useTransactions()
  const { t } = useI18n()
  const last5Transactions = transactions
    ? [...transactions].sort((a, b) => b.executedAt - a.executedAt).slice(0, 5)
    : []

  return (
    <>
      <p className="text-base font-semibold text-gray-800">{t("activFeedRecentActiv")}</p>
      <AnimateSharedLayout>
        <AnimatePresence>
          {last5Transactions?.map((tx, i) => (
            <motion.div
              layout
              key={tx.id}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 50, mass: 1 }}
            >
              <TransactionActivityItem transaction={tx} isFirst={i === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  )
}
