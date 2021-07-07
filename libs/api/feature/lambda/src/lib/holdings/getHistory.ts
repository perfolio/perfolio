import { MiddlewareContext } from "@perfolio/api/feature/middleware"

import { getTransactions } from "../transactions/getTransactions"
import { getTickerFromFigi } from "../assets/getTickerFromFigi"
import { getPrices } from "../prices/getPrices"
import { Transaction } from "@perfolio/integrations/fauna"
import { Time } from "@perfolio/util/time"

export type History = {
  [assetId: string]: {
    time: number
    quantity: number
    value: number
  }[]
}

export type GetHistoryResponse = History
export async function getHistory(_: void, ctx: MiddlewareContext): Promise<GetHistoryResponse> {
  let transactions = await getTransactions(_, ctx)
  if (!transactions || transactions.length === 0) {
    return {}
  }
  transactions = transactions.sort((a, b) => a.data.executedAt - b.data.executedAt)

  const transactionsByAsset = groupTransactionsByAsset(transactions)

  const history: History = {}
  Object.keys(transactionsByAsset).forEach((assetId) => {
    history[assetId] = []
  })

  /**
   * Preload all assets
   * {figi: asset}
   */
  const figiToSymbol: { [figi: string]: string } = {}
  await Promise.all(
    Object.keys(transactionsByAsset).map(async (figi) => {
      const res = await getTickerFromFigi({ figi })
      if (res) {
        figiToSymbol[figi] = res.symbol
      }
    }),
  )
  const priceResponse = await Promise.all(
    Object.entries(figiToSymbol).map(async ([figi, ticker]) => {
      const txs = transactionsByAsset[figi]
      const begin = Time.fromTimestamp(txs[0].data.executedAt).unix()
      const end = Time.today().unix()
      return getPrices({ ticker, begin, end })
    }),
  )

  const prices: {
    [figi: string]: Record<number, number>
  } = {}

  Object.keys(figiToSymbol).forEach((figi, i) => {
    prices[figi] = priceResponse[i]?.prices
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
        Time.fromTimestamp(tx.data.executedAt).equals(currentDay),
      )
      // eslint-disable-next-line no-loop-func
      txsToday.forEach((tx) => {
        quantity += tx.data.volume
      })
      history[assetId]?.push({
        time: currentDay.unix(),
        quantity,
        value: prices[assetId][currentDay.unix()] ?? -1,
      })
    }
  }
  return history
}

/**
 * Aggregate all transactions by their assetId
 */
function groupTransactionsByAsset(transactions: Transaction[]): {
  [assetId: string]: Transaction[]
} {
  const transactionsByAsset: Record<string, Transaction[]> = {}
  transactions.forEach((tx) => {
    if (!(tx.data.assetId in transactionsByAsset)) {
      transactionsByAsset[tx.data.assetId] = []
    }
    const tmpTxs = transactionsByAsset[tx.data.assetId] ?? []
    tmpTxs.push(tx)
    transactionsByAsset[tx.data.assetId] = tmpTxs
  })
  return transactionsByAsset
}
