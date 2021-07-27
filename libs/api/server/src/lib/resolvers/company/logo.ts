import { Company, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const logo: ResolverFn<string, Company, Context, unknown> = async (
  company,
  _args,
  ctx,
  _info,
) => {
  ctx.authenticateUser()

  return await ctx.dataSources.iex.getLogo(company.ticker)
}
