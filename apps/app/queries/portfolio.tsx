import { useQueries } from "react-query"
import { Api } from "@perfolio/api-client"
import { QUERY_KEY_ASSET_BY_ISIN } from "./asset"
import { QUERY_KEY_COMPANY_BY_SYMBOL } from "./company"
import { Asset } from "@perfolio/db"
import { useHistory } from "./history"
import { useSession } from "next-auth/client"

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
  const [session] = useSession()
  const { history, ...meta } = useHistory()

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
  const assets = useQueries(
    Object.keys(session && history ? history : {}).map((isin) => {
      return {
        queryKey: QUERY_KEY_ASSET_BY_ISIN(isin),
        queryFn: () => new Api().assets.getAsset({ isin }),
      }
    }),
  ).map((asset) => (asset.data as Asset).data)
  const companies = useQueries(
    (session && assets ? assets : []).map(({ symbol }) => {
      return {
        queryKey: QUERY_KEY_COMPANY_BY_SYMBOL(symbol),
        queryFn: () => new Api().companies.getCompany({ symbol }),
      }
    }),
  )

  Object.keys(portfolio).forEach((isin, i) => {
    const company = companies[i].data as Company
    if (company) {
      portfolio[isin].company = company
    }
  })

  return { portfolio, ...meta }
}
