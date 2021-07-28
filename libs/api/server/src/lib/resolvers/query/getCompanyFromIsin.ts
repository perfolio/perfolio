import { Company, ResolverFn } from "@perfolio/api/graphql"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { Context } from "../../context"

export const getCompanyFromIsin: ResolverFn<
  Omit<Company, "logo" | "currentValue" | "exchange"> | null,
  void,
  Context,
  { isin: string }
> = async (_parent, { isin }, ctx, { path }) => {
  ctx.authenticateUser()
  const key = new Key({ path, isin })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<Company>(key)
  if (cachedValue) {
    return cachedValue
  }

  const ticker = await ctx.dataSources.openFigi.getTickerFromIsin(isin)
  if (!ticker) {
    throw new Error(`No main ticker found for isin: ${isin}`)
  }

  const value = await ctx.dataSources.iex.getCompany(ticker)
  await cache.set(value ? "30d" : "1d", { key, value })
  return value
}
