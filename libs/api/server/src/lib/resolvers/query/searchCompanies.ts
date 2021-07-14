import { Ticker, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { cachedResolver } from "@perfolio/integrations/redis"

type R = Ticker[]
type P = unknown
type C = Context
type A = { fragment: string; mic: string }

export const searchCompanies: ResolverFn<R, P, C, A> = async (parent, args, ctx, info) => {
  ctx.authenticateUser()

  return cachedResolver<R, P, C, A>("5m", async (_parent, args, ctx, _info) => {
    const fragment = args.fragment.toLowerCase()
    const mic = args.mic.toLowerCase()

    const exchange = await ctx.dataSources.iex.getExchange({ mic })
    if (!exchange) {
      throw new Error(`Unable to find exchange with mic: ${mic}`)
    }

    const tickersAtExchange = await ctx.dataSources.iex.getTickersAtExchange(exchange.abbreviation)

    const filteredTickers = tickersAtExchange.filter((t) =>
      JSON.stringify(Object.values(t)).toLowerCase().includes(fragment),
    )

    return filteredTickers.slice(0, 10)
  })(parent, args, ctx, info)
}
