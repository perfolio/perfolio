import { Company, ResolverFn, Stock } from "@perfolio/api/graphql"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { Context } from "../../context"

export const company: ResolverFn<
  Omit<Company, "logo" | "currentValue" | "exchange"> | null,
  Stock,
  Context,
  unknown
> = async ({ ticker }, _args, ctx, { path }) => {
  ctx.authenticateUser()

  const key = new Key({ path, ticker })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<Company>(key)
  if (cachedValue) {
    return cachedValue
  }

  const value = await ctx.dataSources.iex.getCompany(ticker)
  await cache.set("30d", { key, value })
  return value
}
