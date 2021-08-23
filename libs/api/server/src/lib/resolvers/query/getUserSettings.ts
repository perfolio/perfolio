import { ResolverFn } from "@perfolio/api/graphql"
import { UserSettings as UserSettingsModel } from "@perfolio/integrations/prisma"
import { Context } from "../../context"
export const getUserSettings: ResolverFn<
  UserSettingsModel | null,
  unknown,
  Context,
  { userId: string }
> = async (_parent, { userId }, ctx, _info) => {
  await ctx.authorizeUser(({ sub }) => sub === userId)

  return await ctx.dataSources.prisma.userSettings.findUnique({ where: { userId } })
}
