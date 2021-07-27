import { Company, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const getCompany: ResolverFn<
  Omit<Company, "logo" | "currentValue" | "exchange"> | null,
  void,
  Context,
  { ticker: string }
> = async (_parent, { ticker }, ctx, _info) => {
  ctx.authenticateUser()
  return await ctx.dataSources.iex.getCompany(ticker)
}
