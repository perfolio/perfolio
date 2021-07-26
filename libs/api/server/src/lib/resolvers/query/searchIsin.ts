import { ResolverFn, SearchResult } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { cachedResolver } from "@perfolio/integrations/redis"

type R = Omit<SearchResult, "company">[]
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

  fragment = fragment.toLowerCase()
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

export const searchIsin: ResolverFn<R, P, C, A> = async (parent, args, ctx, info) => {
  ctx.authenticateUser()

  return cachedResolver<R, P, C, A>("5m", async (_parent, args, _ctx, _info) => {
    const fragment = args.fragment.toLowerCase()

    const lookup: { ticker: string; name: string; isin: string }[] = [
      {
        ticker: "tsla",
        name: "Tesla Inc.",
        isin: "US88160R1014",
      },
    ]

    return lookup.filter(({ ticker, name }) => {
      return fuzzyMatch(fragment, ticker) || fuzzyMatch(fragment, name)
    })
  })(parent, args, ctx, info)
}
