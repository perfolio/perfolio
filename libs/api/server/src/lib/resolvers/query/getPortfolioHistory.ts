import { TransactionSchemaFragment, AssetHistory } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { AuthorizationError } from "@perfolio/util/errors"
import { Time } from "@perfolio/util/time"
import { getTickerFromIsin } from "../../util/getTickerFromIsin"

type AssetHistoryWithoutAsset = Omit<AssetHistory, "asset"> & { assetId: string }

export const getPortfolioHistory = async (
  ctx: Context,
  userId: string,
): Promise<AssetHistoryWithoutAsset[]> => {
  const { sub } = await ctx.authenticateUser()
  if (sub !== userId) {
    throw new AuthorizationError("getPortfolioHistory", "wrong user id")
  }

  const userSettings = await ctx.dataSources.prisma.userSettings.findUnique({ where: { userId } })
  const mic = userSettings?.defaultExchangeMic
  if (!mic) {
    throw new Error(`Unable to find defaultExchange in user settings`)
  }
  const exchange = await ctx.dataSources.iex.getExchange({ mic })
  if (!exchange) {
    throw new Error(`No exchange found: ${mic}`)
  }

  const transactions = await ctx.dataSources.prisma.transaction.findMany({ where: { userId } })
  if (!transactions || transactions.length === 0) {
    return []
  }
  transactions.sort((a, b) => a.executedAt - b.executedAt)
  const transactionsByAsset = groupTransactionsByAsset(transactions)
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
  const startDay = Time.fromTimestamp(transactions[0].executedAt)
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
function groupTransactionsByAsset(transactions: TransactionSchemaFragment[]): {
  [assetId: string]: TransactionSchemaFragment[]
} {
  const transactionsByAsset: Record<string, TransactionSchemaFragment[]> = {}
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
