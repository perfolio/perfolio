import { Company, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { convertTime } from "@perfolio/util/time"
import { CacheScope } from "apollo-server-types"
export const searchCompanies: ResolverFn<Company[], unknown, Context, unknown> = (
  _parent,
  _args,
  ctx,
  { cacheControl },
) => {
  ctx.authenticateUser()

  cacheControl.setCacheHint({ maxAge: convertTime("5m"), scope: CacheScope.Public })

  return [] as Company[]
}
