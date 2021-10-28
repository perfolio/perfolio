import { CreateSettings, ResolverFn, Settings } from "@perfolio/pkg/api/graphql"
import { Currency } from "@perfolio/integrations/prisma"
import { Context } from "../../context"

export const createSettings: ResolverFn<Settings, unknown, Context, { settings: CreateSettings }> =
  async (_parent, { settings }, ctx, _info) => {
    await ctx.authorizeUser(({ sub }) => sub === settings.userId)

    const exchange = await ctx.dataSources.iex.getExchange({
      mic: settings.defaultExchange,
    })
    if (!exchange) {
      throw new Error(`Invalid default exchange`)
    }

    const createdSettings = await ctx.dataSources.prisma.settings.create({
      data: {
        userId: settings.userId,
        defaultExchangeMic: settings.defaultExchange,
        defaultCurrency: settings.defaultCurrency as Currency,
      },
    })

    return {
      ...createdSettings,
      defaultExchange: exchange,
    }
  }
