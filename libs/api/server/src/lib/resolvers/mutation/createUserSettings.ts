import { CreateUserSettings, ResolverFn, UserSettings } from "@perfolio/api/graphql"
import { Currency } from "@perfolio/integrations/prisma"
import { AuthorizationError } from "@perfolio/util/errors"
import { Context } from "../../context"

export const createUserSettings: ResolverFn<
  UserSettings,
  unknown,
  Context,
  { userSettings: CreateUserSettings }
> = async (_parent, { userSettings }, ctx, _info) => {
  const { sub } = await ctx.authenticateUser()
  if (sub !== userSettings.userId) {
    throw new AuthorizationError("createUserSettings", "wrong user id")
  }

  const exchange = await ctx.dataSources.iex.getExchange({
    mic: userSettings.defaultExchange,
  })
  if (!exchange) {
    throw new Error(`Invalid default exchange`)
  }

  const createdSettings = await ctx.dataSources.prisma.userSettings.create({
    data: {
      userId: userSettings.userId,
      defaultExchangeMic: userSettings.defaultExchange,
      defaultCurrency: userSettings.defaultCurrency as Currency,
    },
  })

  return {
    ...createdSettings,
    defaultExchange: exchange,
  }
}
