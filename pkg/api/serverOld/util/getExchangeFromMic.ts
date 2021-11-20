import { Exchange } from "@perfolio/pkg/api"
import { Context } from "../context"

export const getExchangeFromMic = async (ctx: Context, mic: string): Promise<Exchange> => {
  const exchange = await ctx.dataSources.iex.getExchange({ mic })
  if (!exchange) {
    throw new Error(`No exchange found for mic: ${mic}`)
  }
  return exchange
}
