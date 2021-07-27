import { Company, ResolverFn } from "@perfolio/api/graphql"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { Context } from "../../context"

export const getCompany: ResolverFn<
  Omit<Company, "logo" | "currentValue" | "exchange"> | null,
  void,
  Context,
  { ticker: string }
> = async (_parent, { ticker }, ctx, { path }) => {
  ctx.authenticateUser()

  const key = new Key({ path, ticker })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<Company>(key)
  if (cachedValue) {
    return cachedValue
  }

  const value = await ctx.dataSources.iex.getCompany(ticker)
  await cache.set("24h", { key, value })
  return value
}
