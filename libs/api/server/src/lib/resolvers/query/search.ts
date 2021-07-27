import { ResolverFn, SearchResult, Company } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { Key, ApolloCache } from "@perfolio/integrations/redis"
import Fuse from "fuse.js"

type R = SearchResult[]
type P = unknown
type C = Context
type A = { fragment: string }

export const search: ResolverFn<R, P, C, A> = async (_parent, args, ctx, { path }) => {
  ctx.authenticateUser()

  const fragment = args.fragment.toLowerCase()

  const key = new Key({ path, fragment })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<R>(key)
  if (cachedValue) {
    return cachedValue
  }

  const isinMap = await ctx.dataSources.fauna.getIsinMap()
  if (!isinMap) {
    throw new Error(`Unable to load isin isinMap map`)
  }

  const isinMatcher = RegExp(/^[a-z]{2}[a-z0-9]{9}[0-9]$/)
  if (isinMatcher.test(fragment)) {
    /**
     * Get from isin
     */
    const isin = fragment.toUpperCase()
    const ticker = await ctx.dataSources.openFigi.getTickerFromIsin(isin).catch((err) => {
      ctx.logger.error(err)
    })
    if (!ticker) {
      throw new Error(`No matching ticker found for isin: ${isin}`)
    }
    /**
     * If the ticker is not found in our isinMap
     */
    if (!isinMap.data.matches.some((m) => m.ticker === ticker)) {
      const company = await ctx.dataSources.iex.getCompany(ticker)
      if (!company) {
        throw new Error(`No company found for ticker: ${ticker}`)
      }
      isinMap.data.matches.push({ isin, ticker, name: company.name })
      await ctx.dataSources.fauna.updateIsinMap(isinMap)
    }
    const company = await ctx.dataSources.iex.getCompany(ticker)
    if (!company) {
      throw new Error(`No company found for ticker: ${ticker}`)
    }
    return [{ isin, ticker, company: company as Company }]
  } else {
    /**
     * Search
     */

    const deduplicationRecord: { [isin: string]: boolean } = {}
    const matches = new Fuse(isinMap.data.matches, {
      includeScore: true,
      shouldSort: true,
      threshold: 0.2,
      keys: [
        {
          name: "name",
          weight: 1,
        },
        { name: "ticker", weight: 5 },
      ],
    })
      .search(fragment)
      .slice(0, 5)
      .map((r) => r.item)
      .filter(({ isin }) => {
        const isDuplicate = deduplicationRecord[isin] ?? false
        deduplicationRecord[isin] = true
        return !isDuplicate
      })

    ctx.logger.debug({ matches })

    let updated = false
    const matchesWithTicker = await Promise.all(
      matches.map(async ({ ticker, isin }) => {
        if (ticker === "") {
          const res = await ctx.dataSources.openFigi.getTickerFromIsin(isin)
          if (res) {
            ticker = res
            const i = isinMap.data.matches.findIndex((m) => m.isin === isin)
            isinMap.data.matches[i].ticker = ticker
            updated = true
          }
        }
        return { ticker, isin }
      }),
    )
    if (updated) {
      await ctx.dataSources.fauna.updateIsinMap(isinMap)
    }
    const matchesWithCompany = await Promise.all(
      matchesWithTicker.map(async (m) => {
        return {
          ...m,
          company: (await ctx.dataSources.iex.getCompany(m.ticker)) as Company,
        }
      }),
    )
    const validMatches = matchesWithCompany.filter((m) => !!m.company) as R

    /**
     * The cachetime for invalid matches is much lower because we will likely find matches
     * after the user has manually added the isin.
     */
    await cache.set(validMatches.length > 0 ? "24h" : "1h", { key, value: validMatches })

    return validMatches
  }
}
