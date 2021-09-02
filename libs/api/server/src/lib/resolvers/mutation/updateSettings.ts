import { UpdateSettings, ResolverFn, Settings, Exchange } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { Currency } from "@perfolio/integrations/prisma"
export const updateSettings: ResolverFn<Settings, unknown, Context, { settings: UpdateSettings }> =
  async (_parent, { settings }, ctx, _info) => {
    await ctx.authorizeUser(({ sub }) => sub === settings.userId)

    let exchange: Exchange | null = null
    if (settings.defaultExchange) {
      exchange = await ctx.dataSources.iex.getExchange({
        mic: settings.defaultExchange,
      })
      if (!exchange) {
        throw new Error(`Invalid default exchange`)
      }
    }

    const updatedSettings = await ctx.dataSources.prisma.settings.update({
      where: { userId: settings.userId },
      data: {
        defaultCurrency: (settings.defaultCurrency as Currency) ?? undefined,
        defaultExchangeMic: settings.defaultExchange ?? undefined,
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
