import { ResolverFn, ExchangeTradedAsset } from "@perfolio/api/graphql"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { Context } from "../../context"

export const sector: ResolverFn<string, ExchangeTradedAsset, Context, unknown> = async (
  { id },
  _args,
  ctx,
  { path },
) => {
  ctx.authenticateUser()

  const key = new Key({ path, id })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<string>(key)
  if (cachedValue) {
    return cachedValue
  }

  const company = await ctx.dataSources.iex.getCompanyFromIsin(id)
  if (!company?.sector) {
    throw new Error(`No company found for isin: ${id}`)
  }
  await cache.set("30d", { key, value: company.sector })
  return company.sector
}
