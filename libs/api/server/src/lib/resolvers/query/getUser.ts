import { ResolverFn } from "@perfolio/api/graphql"
import { User as UserModel } from "@perfolio/integrations/prisma"
import { Context } from "../../context"
export const getUser: ResolverFn<UserModel | null, unknown, Context, { userId: string }> = async (
  _parent,
  { userId },
  ctx,
  _info,
) => {
  await ctx.authorizeUser(({ sub }) => sub === userId)

  const user = await ctx.dataSources.prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw new Error(`No user found: ${userId}`)
  }
  return user
}
