import { ResolverFn } from "@perfolio/api/graphql"
import { Settings as SettingsModel } from "@perfolio/integrations/prisma"
import { Context } from "../../context"
export const getSettings: ResolverFn<SettingsModel | null, unknown, Context, { userId: string }> =
  async (_parent, { userId }, ctx, _info) => {
    await ctx.authorizeUser(({ sub }) => sub === userId)

    return await ctx.dataSources.prisma.settings.findUnique({ where: { userId } })
  }
