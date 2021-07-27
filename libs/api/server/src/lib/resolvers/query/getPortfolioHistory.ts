import { ResolverFn, Transaction, AssetHistory } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { AuthorizationError } from "@perfolio/util/errors"
import { Time } from "@perfolio/util/time"

export const getPortfolioHistory: ResolverFn<AssetHistory[], unknown, Context, { userId: string }> =
  async (_parent, { userId }, ctx, _info) => {
    const { sub } = ctx.authenticateUser()
    if (sub !== userId) {
      throw new AuthorizationError("getPortfolioHistory", "wrong user id")
    }

    const userSettings = await ctx.dataSources.fauna.getUserSettings(userId)
    const mic = userSettings?.data.defaultExchange
    if (!mic) {
      throw new Error(`Unable to find defaultExchange in user settings`)
    }
    const exchange = await ctx.dataSources.iex.getExchange({ mic })
    if (!exchange) {
      throw new Error(`No exchange found: ${mic}`)
    }

    const transactions = await ctx.dataSources.fauna.getTransactions(userId)
    if (!transactions || transactions.length === 0) {
      return []
    }
    transactions.sort((a, b) => a.data.executedAt - b.data.executedAt)
    const transactionsByAsset = groupTransactionsByAsset(
      transactions.map((t) => ({
        ...t.data,
        id: t.id,
        asset: { id: t.data.assetId, ticker: "" },
      })),
    )
    const history: { [assetId: string]: { time: number; quantity: number; value: number }[] } = {}

    Object.keys(transactionsByAsset).forEach((assetId) => {
      history[assetId] = []
    })

    const priceResponse = await Promise.all(
      Object.keys(history).map(async (isin) => {
        const isinMap = await ctx.dataSources.iex.getIsinMapping({ isin })

        const ticker = isinMap.find((i) => i.exchange === exchange.abbreviation)?.symbol
        if (!ticker) {
          throw new Error(`No symbol found for isin ${isin} and exchange: ${exchange} `)
        }

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
    const startDay = Time.fromTimestamp(transactions[0].data.executedAt)
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
    const portfolioHistory = Promise.all(
      Object.entries(history).map(async ([assetId, history]) => {
        const company = await ctx.dataSources.iex.getCompanyFromIsin(assetId)
        if (!company) {
          throw new Error(`No company found for ${assetId}`)
        }

        return {
          asset: { id: assetId, ticker: company.ticker },
          history,
        }
      }),
    )

    return portfolioHistory
  }

/**
 * Aggregate all transactions by their assetId
 */
function groupTransactionsByAsset(transactions: Transaction[]): {
  [assetId: string]: Transaction[]
} {
  const transactionsByAsset: Record<string, Transaction[]> = {}
  transactions.forEach((tx) => {
    if (!(tx.asset.id in transactionsByAsset)) {
      transactionsByAsset[tx.asset.id] = []
    }
    const tmpTxs = transactionsByAsset[tx.asset.id] ?? []
    tmpTxs.push(tx)
    transactionsByAsset[tx.asset.id] = tmpTxs
  })
  return transactionsByAsset
}
