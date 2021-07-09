import { useQueries } from "react-query"
import { useApi } from "@perfolio/data-access/api-client"
import { QUERY_KEY_TICKER_FROM_FIGI } from "./asset"
import { QUERY_KEY_COMPANY_BY_SYMBOL } from "./company"
import { useHistory } from "./history"
import { useSession } from "@perfolio/auth"

import { Company } from "@perfolio/types"

export interface Holding {
  quantity: number
  value: number
  company: Company
}

export interface Portfolio {
  [assetID: string]: Holding
}
/**
 * Start from the last entry and go back.
 * Return the first entry that has a value > 0
 *
 * We store prices with value `-1` on weekends for example, but we need a "real"
 * value here.
 */
const getLastWithValue = (
  arr: { quantity: number; value: number }[],
): { quantity: number; value: number } => {
  if (arr.length >= 1) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const element = arr[i]
      if (!!element && element.value > 0) {
        return element
      }
    }
  }
  throw new Error("Nope")
}

export const usePortfolio = () => {
  const { session } = useSession()
  const { history, ...meta } = useHistory()
  const api = useApi()

  const portfolio: Portfolio = {}
  if (history) {
    Object.entries(history).forEach(([assetId, timeline]) => {
      const latest = getLastWithValue(timeline)
      portfolio[assetId] = {
        quantity: latest.quantity,
        value: latest.value,
      } as Holding
    })
  }
  const symbols = useQueries(
    Object.keys(session && history ? history : {}).map((figi) => {
      return {
        queryKey: QUERY_KEY_TICKER_FROM_FIGI(figi),
        queryFn: () => api.assets.getTickerFromFigi({ figi }),
      }
    }),
  ).map((symbol) => {
    return (symbol.data as { symbol: string }).symbol
  })

  /**
   * Inject company data
   */
  const companies = useQueries(
    (session && symbols && symbols.every((ticker) => typeof ticker !== "undefined")
      ? symbols
      : []
    ).map((ticker) => {
      return {
        queryKey: QUERY_KEY_COMPANY_BY_SYMBOL(ticker),
        queryFn: () => api.companies.getCompany({ ticker }),
      }
    }),
  )
  if (companies && companies.length === Object.keys(portfolio).length) {
    Object.keys(portfolio).forEach((isin, i) => {
      const company = companies[i].data as Company
      if (company) {
        portfolio[isin].company = company
      }
    })
  }

  /**
   * Remove all assets that the user has sold completely
   *
   * If this step is omitted we would display symbols with quantity = 0 and all
   * derived values are nonsense.
   */
  Object.entries(portfolio).forEach(([assetId, { quantity }]) => {
    if (quantity <= 0) {
      delete portfolio[assetId]
    }
  })

  return { portfolio, ...meta }
}
