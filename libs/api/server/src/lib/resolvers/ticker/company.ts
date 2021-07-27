import { Company, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const company: ResolverFn<
  Omit<Company, "logo" | "currentValue" | "exchange"> | null,
  Company,
  Context,
  void
> = async ({ ticker }, _args, ctx, _info) => {
  ctx.authenticateUser()

  return await ctx.dataSources.iex.getCompany(ticker)
}
