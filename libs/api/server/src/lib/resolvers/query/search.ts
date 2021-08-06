import { ResolverFn, SearchResult } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { search as searchAssets } from "@perfolio/feature/asset-search"
import { getTickerFromIsin } from "../../util/getTickerFromIsin"

export const search: ResolverFn<SearchResult[], unknown, Context, { fragment: string }> = async (
  _parent,
  { fragment },
  ctx,
  { path },
) => {
  await ctx.authenticateUser()

  fragment = fragment.toLowerCase()

  const cache = new ApolloCache()
  const key = new Key({ path, fragment })

  const cachedValue = await cache.get<SearchResult[]>(key)
  if (cachedValue) {
    return cachedValue
  }
  const isinMap = await ctx.dataSources.prisma.stockMap.findMany()
  if (!isinMap) {
    throw new Error(`No isin map found in prisma`)
  }
  ctx.logger.debug({ isinMap })

  const searchResult = await searchAssets(fragment, isinMap, (isin) => getTickerFromIsin(ctx, isin))
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
  value.forEach(async ({ isin, ticker, asset: { name } }) => {
    if (!isinMap.map((m) => m.isin).includes(isin)) {
      await ctx.dataSources.prisma.stockMap.upsert({
        where: { ticker },
        update: { isin, ticker, name },
        create: { isin, ticker, name },
      })
    }
  })

  await cache.set(value.length > 0 ? "30d" : "1d", { key, value })
  return value.map((v) => v as SearchResult)
}
