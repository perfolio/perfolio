import { AbsoluteAssetHistory } from "@perfolio/pkg/api"
import { Context } from "@perfolio/pkg/api/context"
import {
  ExchangeTradedAssetModel,
  PortfolioModel,
  TransactionModel,
} from "@perfolio/pkg/integrations/prisma"
import { Time } from "@perfolio/pkg/util/time"

export async function getAbsoluteHistory(
  portfolio: PortfolioModel,
  ctx: Context,
): Promise<Omit<AbsoluteAssetHistory, "asset">[]> {
  await ctx.authorizeUser((claims) => claims.sub === portfolio.userId)

  const transactions = await ctx.dataSources.db.transaction.findMany({
    where: { portfolioId: portfolio.id },
    include: { asset: true },
  })

  transactions.sort((a, b) => a.executedAt - b.executedAt)

  const key = ctx.cache.key(...transactions)
  // const cachedValue = await ctx.cache.get<AbsoluteAssetHistory[]>(key)
  // if (cachedValue) {
  //   ctx.logger.debug("Cache hit", { key, cachedValue })
  //   return cachedValue
  // }

  const assets: { [assetId: string]: ExchangeTradedAssetModel } = {}
  for (const tx of transactions) {
    assets[tx.assetId] = tx.asset
  }

  /**
   * Aggregate transactions by assets
   */
  const transactionsByAsset: {
    [assetId: string]: TransactionModel[]
  } = {}
  for (const tx of transactions) {
    if (!transactionsByAsset[tx.assetId]) {
      transactionsByAsset[tx.assetId] = []
    }

    transactionsByAsset[tx.assetId].push(tx)
  }

  const prices = await Promise.all(
    Object.values(assets).map(async (asset) => {
      const foundIsin = await ctx.dataSources.openFigi.findIsin({
        isin: asset.isin,
      })
      if (!foundIsin) {
        throw new Error(`Unable to find isin: ${asset.isin}`)
      }

      const ticker = foundIsin.compositeFIGI === foundIsin.figi
        ? foundIsin.ticker
        : [foundIsin.ticker, foundIsin.exchCode].join("-")

      return {
        assetId: asset.id,
        history: await ctx.dataSources.iex.getHistory(ticker),
      }
    }),
  )

  const historyByAsset: { [assetId: string]: { [time: number]: number } } = {}
  for (const price of prices) {
    historyByAsset[price.assetId] = price.history
  }

  const history: {
    [assetId: string]: { time: number; quantity: number; value?: number }[]
  } = {}

  const startDay = Time.fromTimestamp(transactions[0].executedAt)
  for (const [assetId, transactions] of Object.entries(transactionsByAsset)) {
    if (!history[assetId]) {
      history[assetId] = []
    }

    let quantity = 0
    for (
      let currentDay = startDay;
      currentDay.unix() <= Date.now() / 1000;
      currentDay = currentDay.nextDay()
    ) {
      /**
       * Get transactions that happened on this day
       */
      const txsToday = transactions.filter((tx) =>
        Time.fromTimestamp(tx.executedAt).equals(currentDay)
      )

      for (const tx of txsToday) {
        quantity += tx.volume
      }
      history[assetId]?.push({
        time: currentDay.unix(),
        quantity,
        value: historyByAsset[assetId][currentDay.unix()],
      })
    }
  }

  const value = Object.entries(history).map(([assetId, history]) => ({
    assetId,
    history,
  }))
  // await ctx.cache.set("2h", { key, value })
  return value
}
