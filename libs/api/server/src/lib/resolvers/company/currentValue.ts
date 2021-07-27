import { Company, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const currentValue: ResolverFn<number, Company, Context, unknown> = async (
  { ticker },
  _args,
  ctx,
) => {
  ctx.authenticateUser()

  return await ctx.dataSources.iex.getCurrentPrice({ ticker })
}
