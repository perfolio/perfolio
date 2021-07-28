import { ResolverFn, SearchResult } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { AssetSearch } from "@perfolio/feature/asset-search"
type R = SearchResult[]
type P = unknown
type C = Context
type A = { fragment: string }

export const search: ResolverFn<R, P, C, A> = async (_parent, { fragment }, ctx, { path }) => {
  ctx.authenticateUser()

  const s = new AssetSearch(ctx.dataSources.iex, ctx.dataSources.fauna)

  fragment = fragment.toLowerCase()

  const cache = new ApolloCache()
  const key = new Key({ path, fragment })

  const cachedValue = await cache.get<SearchResult[]>(key)
  if (cachedValue) {
    return cachedValue
  }

  const searchResult = await s.search(fragment)
  const value = await Promise.all(
    searchResult.map(async ({ isin, ticker }) => {
      const company = await ctx.dataSources.iex.getCompany(ticker)
      if (!ticker) {
        throw new Error(`No company found for ticker: ${ticker}`)
      }
      return {
        isin,
        ticker,
        company,
      }
    }),
  )
  await cache.set(value.length > 0 ? "30d" : "1d", { key, value })
  return value.map((v) => v as SearchResult)
}
