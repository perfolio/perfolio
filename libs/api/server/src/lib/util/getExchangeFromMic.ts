import { Context } from "../context"
import { Exchange } from "@perfolio/api/graphql"

export const getExchangeFromMic = async (ctx: Context, mic: string): Promise<Exchange> => {
  const exchange = await ctx.dataSources.iex.getExchange({ mic })
  if (!exchange) {
    throw new Error(`No exchange found for mic: ${mic}`)
  }
  return exchange
}
