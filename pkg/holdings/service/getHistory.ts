import { Transaction } from ".prisma/client"
import { getSymbolFromIsin } from "pkg/iex"
import { getPrices } from "pkg/iex/lib/getPrices"
import { Time } from "pkg/time"

import * as z from "zod"
import { getTransactions } from "./getTransactions"

export const GetHistoryRequestValidation = z.object({
  userId: z.string().uuid(),
})

export type GetHistoryRequest = z.infer<typeof GetHistoryRequestValidation>

export type GetHistoryResponse = {
  [assetId: string]: {
    time: number
    quantity: number
    /**
     * per share
     */
    value: number
  }[]
}

export async function getHistory(
  req: GetHistoryRequest,
): Promise<GetHistoryResponse> {
  console.time("getHistory")
  let { transactions } = await getTransactions({ userId: req.userId })
  if (!transactions || transactions.length === 0) {
    return {}
  }
  console.time("prepareTransactions")
  transactions = transactions.sort((a, b) => a.executedAt - b.executedAt)

  const transactionsByAsset = groupTransactionsByAsset(transactions)
  console.timeEnd("prepareTransactions")

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
  console.time("loadSymbols")
  await Promise.all(
    Object.keys(transactionsByAsset).map(async (isin) => {
      const { symbol } = await getSymbolFromIsin({ isin })
      isinToSymbol[isin] = symbol.symbol
    }),
  )
  console.timeEnd("loadSymbols")
  console.time("loadPrices")
  const priceResponse = await Promise.all(
    Object.entries(isinToSymbol).map(async ([isin, symbol]) => {
      const txs = transactionsByAsset[isin]!
      const begin = txs[0]!.executedAt
      const end = Time.today().unix()
      return getPrices({ symbol, begin, end })
    }),
  )

  const prices: {
    [isin: string]: Record<number, number>
  } = {}

  Object.keys(isinToSymbol).forEach((isin, i) => {
    prices[isin] = priceResponse[i]?.prices!
  })
  console.timeEnd("loadPrices")

  /**
   * Build a timeline for each asset for each day.
   */
  const startDay = Time.fromTimestamp(transactions[0]!.executedAt)
  console.time("aggregateHoldings")
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
        value: prices[assetId]![currentDay.unix()] ?? -1,
      })
    }
  }
  console.timeEnd("aggregateHoldings")
  console.timeEnd("getHistory")
  return history
}

function groupTransactionsByAsset(
  transactions: Transaction[],
): Record<string, Transaction[]> {
  const transactionsByAsset: Record<string, Transaction[]> = {}
  transactions.forEach((tx) => {
    if (!(tx.assetId in transactionsByAsset)) {
      transactionsByAsset[tx.assetId] = []
    }
    const tmpTxs = transactionsByAsset[tx.assetId]!
    tmpTxs.push(tx)
    transactionsByAsset[tx.assetId] = tmpTxs
  })
  return transactionsByAsset
}
