import { ResolverFn, SearchResult, Company } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { Key, ApolloCache } from "@perfolio/integrations/redis"

type R = SearchResult[]
type P = unknown
type C = Context
type A = { fragment: string }

/**
 * Return true if the target includes all characters of the fragment in the correct order.
 * @param fragment - user input
 *
 */
const fuzzyMatch = (fragment: string, target: string): boolean => {
  if (fragment.length > target.length) {
    return false
  }

  fragment = fragment.toLowerCase().replace(" ", "")
  target = target.toLowerCase()

  if (fragment.length === target.length) {
    return fragment === target
  }
  f: for (
    let fragmentIndex = 0, targetIndex = 0;
    fragmentIndex < fragment.length;
    fragmentIndex++
  ) {
    while (targetIndex < target.length) {
      if (target.charAt(targetIndex++) === fragment.charAt(fragmentIndex)) {
        continue f
      }
    }
    return false
  }
  return true
}

export const search: ResolverFn<R, P, C, A> = async (_parent, args, ctx, _info) => {
  ctx.authenticateUser()

  const fragment = args.fragment.toLowerCase()

  const key = new Key({ resolver: "search", fragment })
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
    const matches = isinMap.data.matches
      .filter(({ name, ticker }) => {
        return (ticker.length > 0 && fuzzyMatch(fragment, ticker)) || fuzzyMatch(fragment, name)
      })
      .slice(0, 10)

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

    await cache.set("24h", { key, value: validMatches })

    return validMatches
  }
}
