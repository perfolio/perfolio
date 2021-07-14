import { UserSettings, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { CacheScope } from "apollo-server-types"
import { AuthorizationError } from "@perfolio/util/errors"
export const getUserSettings: ResolverFn<
  UserSettings | null,
  unknown,
  Context,
  { userId: string }
> = async (_parent, { userId }, ctx, { cacheControl }) => {
  const { sub } = ctx.authenticateUser()
  if (sub !== userId) {
    throw new AuthorizationError("getUserSettings", "wrong user id")
  }

  cacheControl.setCacheHint({ maxAge: 0, scope: CacheScope.Private })

  const userSettings = await ctx.dataSources.fauna.getUserSettings(userId)

  return userSettings
    ? {
        userId,
        defaultCurrency: userSettings.data.defaultCurrency,
        defaultExchange: (await ctx.dataSources.iex.getExchange({
          mic: userSettings.data.defaultExchange,
        }))!,
      }
    : null
}
