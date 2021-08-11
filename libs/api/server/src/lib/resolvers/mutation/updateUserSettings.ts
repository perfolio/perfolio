import { UpdateUserSettings, ResolverFn, UserSettings, Exchange } from "@perfolio/api/graphql"
import { AuthorizationError } from "@perfolio/util/errors"
import { Context } from "../../context"
import { Currency } from "@perfolio/integrations/prisma"
export const updateUserSettings: ResolverFn<
  UserSettings,
  unknown,
  Context,
  { userSettings: UpdateUserSettings }
> = async (_parent, { userSettings }, ctx, _info) => {
  const { sub } = await ctx.authenticateUser()
  if (sub !== userSettings.userId) {
    throw new AuthorizationError("updateUserSettings", "wrong user id")
  }

  let exchange: Exchange | null = null
  if (userSettings.defaultExchange) {
    exchange = await ctx.dataSources.iex.getExchange({
      mic: userSettings.defaultExchange,
    })
    if (!exchange) {
      throw new Error(`Invalid default exchange`)
    }
  }

  const updatedSettings = await ctx.dataSources.prisma.userSettings.update({
    where: { userId: userSettings.userId },
    data: {
      defaultCurrency: (userSettings.defaultCurrency as Currency) ?? undefined,
      defaultExchangeMic: userSettings.defaultExchange ?? undefined,
    },
  })
  if (!exchange) {
    exchange = await ctx.dataSources.iex.getExchange({ mic: updatedSettings.defaultExchangeMic })
  }

  return {
    ...updatedSettings,
    defaultExchange: exchange!,
  }
}
