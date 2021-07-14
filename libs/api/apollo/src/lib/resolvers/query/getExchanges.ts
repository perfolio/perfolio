import { Exchange, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { convertTime } from "@perfolio/util/time"
import { CacheScope } from "apollo-server-types"
export const getExchanges: ResolverFn<Exchange[], unknown, Context, unknown> = (
  _parent,
  _args,
  ctx,
  { cacheControl },
) => {
  ctx.authenticateUser()

  cacheControl.setCacheHint({ maxAge: convertTime("1d"), scope: CacheScope.Public })

  return ctx.dataSources.iex.getExchanges()
}
