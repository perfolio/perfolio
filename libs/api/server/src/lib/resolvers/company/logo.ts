import { Company, ResolverFn } from "@perfolio/api/graphql"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { Context } from "../../context"

export const logo: ResolverFn<string, Company, Context, unknown> = async (
  company,
  _args,
  ctx,
  { path },
) => {
  ctx.authenticateUser()

  const key = new Key({ path, company })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<string>(key)
  if (cachedValue) {
    return cachedValue
  }

  const value = await ctx.dataSources.iex.getLogo(company.ticker)
  await cache.set("30d", { key, value })
  return value
}
