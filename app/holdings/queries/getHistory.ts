import { resolver } from "blitz"
import getTransactions from "app/transactions/queries/getTransactions"
import getSymbol from "app/symbols/queries/getSymbolFromIsin"
import getPrices from "app/prices/queries/getPrices"
import * as z from "zod"
import { Transaction } from "db"
import { Time } from "app/time"

export default resolver.pipe(
  resolver.zod(
    z.object({
      userId: z.string(),
    }),
  ),
  resolver.authorize(),
  async ({ userId }, ctx) => {
    let transactions = await getTransactions({ userId }, ctx)
    if (!transactions || transactions.length === 0) {
      return {}
    }
    transactions = transactions.sort(
      (a, b) => a.data.executedAt - b.data.executedAt,
    )

    const transactionsByAsset = groupTransactionsByAsset(transactions)

    const history: {
      [assetId: string]: {
        time: number
        quantity: number
        value: number
      }[]
    } = {}
    Object.keys(transactionsByAsset).forEach((assetId) => {
      history[assetId] = []
    })

    /**
     * Preload all symbols
     * {isin: symbol}
     */
    const isinToSymbol: { [isin: string]: string } = {}
    await Promise.all(
      Object.keys(transactionsByAsset).map(async (isin) => {
        const symbol = await getSymbol({ isin }, ctx)
        isinToSymbol[isin] = symbol.data.symbol
      }),
    )
    const priceResponse = await Promise.all(
      Object.entries(isinToSymbol).map(async ([isin, symbol]) => {
        const txs = transactionsByAsset[isin]!
        const begin = Time.fromTimestamp(txs[0]!.data.executedAt).unix()
        const end = Time.today().unix()
        return getPrices({ symbol, begin, end }, ctx)
      }),
    )

    const prices: {
      [isin: string]: Record<number, number>
    } = {}

    Object.keys(isinToSymbol).forEach((isin, i) => {
      prices[isin] = priceResponse[i]?.prices!
    })

    /**
     * Build a timeline for each asset for each day.
     */
    const startDay = Time.fromTimestamp(transactions[0]!.data.executedAt)
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
          value: prices[assetId]![currentDay.unix()] ?? -1,
        })
      }
    }
    return history
  },
)

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
    const tmpTxs = transactionsByAsset[tx.data.assetId]!
    tmpTxs.push(tx)
    transactionsByAsset[tx.data.assetId] = tmpTxs
  })
  return transactionsByAsset
}
