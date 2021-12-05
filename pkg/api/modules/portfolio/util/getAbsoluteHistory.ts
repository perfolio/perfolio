import { AbsoluteAssetHistory, ValueAndQuantityAtTime } from "@perfolio/pkg/api"
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

  // const key = ctx.cache.key(...transactions)
  // const cachedValue = await ctx.cache.get<AbsoluteAssetHistory[]>(key)
  // if (cachedValue) {
  //   ctx.logger.debug("Cache hit", { key, cachedValue })
  //   return cachedValue
  // }

  const assets: {
    [assetId: string]: { asset: ExchangeTradedAssetModel; mic: string }
  } = {}
  for (const tx of transactions) {
    assets[tx.assetId] = { asset: tx.asset, mic: tx.mic }
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
    Object.values(assets).map(async ({ asset, mic }) => {
      const foundIsins = await ctx.dataSources.openFigi.findIsin({
        isin: asset.isin,
        micCode: mic,
      })
      if (foundIsins.length === 0) {
        throw new Error(`Unable to find isin: ${asset.isin}`)
      }
      const foundIsin = foundIsins[0]

      const ticker =
        foundIsin.compositeFIGI === foundIsin.figi
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
    [assetId: string]: {
      time: number
      quantity: number
      value: number | null
    }[]
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
        Time.fromTimestamp(tx.executedAt).equals(currentDay),
      )

      for (const tx of txsToday) {
        quantity += tx.volume
      }
      history[assetId]?.push({
        time: currentDay.unix(),
        quantity,
        value: historyByAsset[assetId][currentDay.unix()] ?? null,
      })
    }
  }

  const value: {
    assetId: string
    history: ValueAndQuantityAtTime[]
  }[] = []

  for (const [assetId, assetHistory] of Object.entries(history)) {
    /**
     * IEX does not return data on days where no trading takes place
     * so we interpolated missing values
     */
    const interpolatedAssetHistory: ValueAndQuantityAtTime[] = []
    for (let i = 0; i < assetHistory.length; i++) {
      if (assetHistory[i].value) {
        interpolatedAssetHistory.push(assetHistory[i] as ValueAndQuantityAtTime)
      } else {
        if (i === 0) {
          /**
           * Set the value to 0 if it's the very first entry
           */
          interpolatedAssetHistory.push({
            ...assetHistory[i],
            value: 0,
          })
        } else {
          /**
           * Use the last known value
           * The price of a stock should be the same on saturday as it was on friday.
           */
          if (i === 0) {
            interpolatedAssetHistory.push({
              ...assetHistory[i],
              value: assetHistory[i - 1].value!,
            })
          }
        }
      }
    }
    value.push({ assetId, history: interpolatedAssetHistory })
  }
  // await ctx.cache.set("2h", { key, value })
  return value
}
