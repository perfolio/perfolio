import { ExchangeTradedAsset, Transaction } from "@perfolio/pkg/api"
import { usePortfolio } from "@perfolio/pkg/hooks"
import { useI18n } from "next-localization"
import { Time } from "@perfolio/pkg/util/time"
import { Text } from "@perfolio/ui/components"
import cn from "classnames"
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import React from "react"
interface TransactionActivityItemProps {
  transaction: Transaction
  isFirst?: boolean
}

const TransactionActivityItem: React.FC<TransactionActivityItemProps> = ({
  transaction,
  isFirst,
}): JSX.Element => {
  const { t } = useI18n()
  const asset = transaction.asset as ExchangeTradedAsset
  return (
    <div
      className={cn(" py-4", {
        "border-t border-gray-100": !isFirst,
      })}
    >
      <div className="flex items-center justify-between">
        <Text size="sm" bold>
          {t("app.activFeedNewTrans")}
        </Text>
        <Text size="xs">{Time.ago(transaction.executedAt)}</Text>
      </div>
      <Text size="sm">
        You {transaction.volume > 0 ? "bought" : "sold"} {transaction.volume}{" "}
        <span className="font-semibold">{asset.ticker}</span> shares at ${transaction.value} per
        share.
      </Text>
    </div>
  )
}

export const ActivityFeed: React.FC = (): JSX.Element => {
  const { portfolio } = usePortfolio()
  const { t } = useI18n()
  const last5Transactions = portfolio?.transactions
    ? [...portfolio?.transactions].sort((a, b) => b.executedAt - a.executedAt).slice(0, 5)
    : []

  return (
    <>
      <p className="text-base font-semibold text-gray-800">{t("app.activFeedRecentActiv")}</p>
      <AnimateSharedLayout>
        <AnimatePresence>
          {last5Transactions?.map((tx, i) => (
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
              <TransactionActivityItem transaction={tx} isFirst={i === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  )
}
