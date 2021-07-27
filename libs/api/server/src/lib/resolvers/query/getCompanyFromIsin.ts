import { Company, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const getCompanyFromIsin: ResolverFn<
  Omit<Company, "logo" | "currentValue" | "exchange"> | null,
  void,
  Context,
  { isin: string }
> = async (_parent, { isin }, ctx, _info) => {
  ctx.authenticateUser()

  const isinMap = await ctx.dataSources.iex.getIsinMapping({ isin })
  const ticker = isinMap.find((i) => !i.symbol.includes("-"))?.symbol
  if (!ticker) {
    throw new Error(`No main ticker found for isin: ${isin}`)
  }

  return await ctx.dataSources.iex.getCompany(ticker)
}
