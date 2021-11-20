import { Context } from "../context"

export const getTickerFromIsin = async (ctx: Context, isin: string): Promise<string> => {
  const isinMap = await ctx.dataSources.iex.getIsinMapping(isin)
  const ticker = isinMap.find(({ symbol }) => !symbol.includes("-"))?.symbol
  if (!ticker) {
    throw new Error(`Unable to find ticker in isinMap: ${isinMap}`)
  }
  const company = await ctx.dataSources.iex.getCompany(ticker)
  if (!company) {
    throw new Error(`Unable to find company from ticker: ${ticker}`)
  }
  return company.ticker
}
