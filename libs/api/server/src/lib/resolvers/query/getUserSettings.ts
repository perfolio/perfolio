import { ResolverFn } from "@perfolio/api/graphql"
import { UserSettings as UserSettingsModel } from "@perfolio/integrations/prisma"
import { Context } from "../../context"
import { AuthorizationError } from "@perfolio/util/errors"
export const getUserSettings: ResolverFn<
  UserSettingsModel | null,
  unknown,
  Context,
  { userId: string }
> = async (_parent, { userId }, ctx, _info) => {
  const { sub } = await ctx.authenticateUser()
  if (sub !== userId) {
    throw new AuthorizationError("getUserSettings", "wrong user id")
  }

  return await ctx.dataSources.prisma.getUserSettings(userId)
}
