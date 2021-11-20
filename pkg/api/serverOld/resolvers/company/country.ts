import { Company, ResolverFn } from "@perfolio/pkg/api"
import { ApolloCache, Key } from "@perfolio/pkg/integrations/redis"

import { Context } from "../../context"

export const country: ResolverFn<string, Company, Context, unknown> = async (
  { id },
  _args,
  ctx,
  { path },
) => {
  ctx.authenticateUser()

  const key = new Key(path.typename, path.key, { id })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<string>(key)
  if (cachedValue) {
    return cachedValue
  }

  const asset = await ctx.dataSources.prisma.exchangeTradedAsset.findUnique({
    where: { id },
  })
  if (!asset) {
    throw new Error(`No asset found with id: ${id}`)
  }

  const company = await ctx.dataSources.iex.getCompany(asset.ticker)
  if (!company?.country) {
    throw new Error(`No company found for ticker: ${asset.ticker}`)
  }
  await cache.set("30d", { key, value: company.country })
  return company.country
}
