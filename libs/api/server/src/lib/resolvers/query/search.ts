import { ResolverFn, SearchResult } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { search as searchAssets } from "@perfolio/feature/asset-search"

export const search: ResolverFn<SearchResult[], unknown, Context, { fragment: string }> = async (
  _parent,
  { fragment },
  ctx,
  { path },
) => {
  ctx.authenticateUser()

  fragment = fragment.toLowerCase()

  const cache = new ApolloCache()
  const key = new Key({ path, fragment })

  const cachedValue = await cache.get<SearchResult[]>(key)
  if (cachedValue) {
    return cachedValue
  }
  const isinMap = await ctx.dataSources.fauna.getIsinMap()
  if (!isinMap) {
    throw new Error(`No isin map found in fauna`)
  }

  const getSymbolsFromIsin = async (isin: string): Promise<string[]> => {
    const isins = await ctx.dataSources.iex.getIsinMapping(isin)
    return isins.map(({ symbol }) => symbol)
  }

  const searchResult = await searchAssets(fragment, isinMap.data.matches, getSymbolsFromIsin)
  const value = await Promise.all(
    searchResult.map(async ({ isin, ticker }) => {
      const company = await ctx.dataSources.iex.getCompany(ticker)
      if (!company) {
        throw new Error(`No company found for ticker: ${ticker}`)
      }
      return {
        isin,
        ticker,
        asset: {
          id: isin,
          ticker,
          name: company.name,
          logo: company.logo,
        },
      }
    }),
  )

  /**
   * Update our internal isin map if necessary
   */
  let hasUpdated = false
  value.forEach(({ isin, ticker, asset: { name } }) => {
    if (!isinMap.data.matches.map((m) => m.isin).includes(isin)) {
      isinMap.data.matches.push({ isin, ticker, name })
      hasUpdated = true
    }
  })
  if (hasUpdated) {
    await ctx.dataSources.fauna.updateIsinMap(isinMap)
  }

  await cache.set(value.length > 0 ? "30d" : "1d", { key, value })
  return value.map((v) => v as SearchResult)
}
