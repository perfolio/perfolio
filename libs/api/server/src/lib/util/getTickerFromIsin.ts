import { Context } from "../context"

export const getTickerFromIsin = async (ctx: Context, isin: string): Promise<string> => {
  let match = await ctx.dataSources.prisma.stockMap.findUnique({ where: { isin } })
  if (!match) {
    const isinMap = await ctx.dataSources.iex.getIsinMapping(isin)
    console.log({ isin, isinMap })
    const ticker = isinMap.find(({ symbol }) => !symbol.includes("-"))?.symbol
    if (!ticker) {
      throw new Error(`Unable to find ticker in isinMap: ${isinMap}`)
    }
    const company = await ctx.dataSources.iex.getCompany(ticker)
    if (!company) {
      throw new Error(`Unable to find company from ticker: ${ticker}`)
    }
    match = await ctx.dataSources.prisma.stockMap.create({
      data: {
        ticker: company.ticker,
        isin,
        name: company.name,
      },
    })
  }

  if (!match) {
    throw new Error(`No company found for isin: ${isin}`)
  }
  return match.ticker
}
