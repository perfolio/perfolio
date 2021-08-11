import { ResolverFn, ValueAtTime } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const getStockPricesAtExchange: ResolverFn<
  ValueAtTime[],
  unknown,
  Context,
  { ticker: string; mic: string; start: number; end?: number }
> = async (_parent, { ticker, mic, start, end }, ctx, _info) => {
  await ctx.authenticateUser()

  const exchange = await ctx.dataSources.iex.getExchange({ mic })
  if (!exchange) {
    throw new Error(`No exchange found: ${mic}`)
  }
  const prices = await ctx.dataSources.iex.getPrices({ ticker })

  return Object.entries(prices)
    .map(([time, value]) => ({ time: Number(time), value }))
    .filter(({ time }) => time >= start && time <= (end ?? Infinity))
}
