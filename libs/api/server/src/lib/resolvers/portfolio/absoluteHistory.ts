import { AssetHistory } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { Time } from "@perfolio/util/time"
import { getTickerFromIsin } from "../../util/getTickerFromIsin"
import { Transaction as TransactionModel } from "@perfolio/integrations/prisma"
type AssetHistoryWithoutAsset = Omit<AssetHistory, "asset"> & { assetId: string }

export const getAbsolutePortfolioHistory = async (
  ctx: Context,
  portfolioId: string,
): Promise<AssetHistoryWithoutAsset[]> => {
  const portfolio = await ctx.prisma.portfolio.findUnique({
    where: { id: portfolioId },
    include: { transactions: true },
  })
  if (!portfolio) {
    throw new Error(`Portfolio not found: ${portfolioId}`)
  }

  await ctx.authorizeUser(({ sub }) => sub === portfolio.userId)

  if (!portfolio.transactions || portfolio.transactions.length === 0) {
    return []
  }

  const settings = await ctx.dataSources.prisma.settings.findUnique({
    where: { userId: portfolio.userId },
  })
  const mic = settings?.defaultExchangeMic
  if (!mic) {
    throw new Error(`Unable to find defaultExchange in user settings`)
  }
  const exchange = await ctx.dataSources.iex.getExchange({ mic })
  if (!exchange) {
    throw new Error(`No exchange found: ${mic}`)
  }

  portfolio.transactions.sort((a, b) => a.executedAt - b.executedAt)
  const transactionsByAsset = groupTransactionsByAsset(portfolio.transactions)
  const history: { [assetId: string]: { time: number; quantity: number; value: number }[] } = {}

  Object.keys(transactionsByAsset).forEach((assetId) => {
    history[assetId] = []
  })

  const priceResponse = await Promise.all(
    Object.keys(history).map(async (isin) => {
      const ticker = await getTickerFromIsin(ctx, isin)

      return ctx.dataSources.iex.getPrices({ ticker })
    }),
  )

  const prices: {
    [ticker: string]: { [timestamp: number]: number }
  } = {}

  Object.keys(history).forEach((ticker, i) => {
    prices[ticker] = priceResponse[i]
  })

  /**
   * Build a timeline for each asset for each day.
   */
  const startDay = Time.fromTimestamp(portfolio.transactions[0].executedAt)
  for (const [assetId, transactions] of Object.entries(transactionsByAsset)) {
    /**
     * How many shares does the user have on the current day
     */
    let quantity = 0
    for (
      let currentDay = startDay;
      currentDay.unix() < Date.now() / 1000;
      currentDay = currentDay.nextDay()
    ) {
      /**
       * Get transactions that happened on this day
       */
      const txsToday = transactions.filter((tx) =>
        Time.fromTimestamp(tx.executedAt).equals(currentDay),
      )
      // eslint-disable-next-line no-loop-func
      txsToday.forEach((tx) => {
        quantity += tx.volume
      })
      history[assetId]?.push({
        time: currentDay.unix(),
        quantity,
        value: prices[assetId][currentDay.unix()] ?? -1,
      })
    }
  }
  return Object.entries(history).map(([assetId, history]) => ({
    assetId,
    history,
  }))
}

/**
 * Aggregate all transactions by their assetId
 */
function groupTransactionsByAsset(transactions: TransactionModel[]): {
  [assetId: string]: TransactionModel[]
} {
  const transactionsByAsset: Record<string, TransactionModel[]> = {}
  transactions.forEach((tx) => {
    if (!(tx.assetId in transactionsByAsset)) {
      transactionsByAsset[tx.assetId] = []
    }
    const tmpTxs = transactionsByAsset[tx.assetId] ?? []
    tmpTxs.push(tx)
    transactionsByAsset[tx.assetId] = tmpTxs
  })
  return transactionsByAsset
}
