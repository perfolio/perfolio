import { ResolverFn } from "@perfolio/pkg/api/graphql"
import { User as UserModel } from "@perfolio/integrations/prisma"
import { Context } from "../../context"
export const user: ResolverFn<UserModel | null, unknown, Context, { userId: string }> = async (
  _parent,
  { userId },
  ctx,
  _info,
) => {
  await ctx.authorizeUser(({ sub }) => sub === userId)

  const user = await ctx.dataSources.prisma.user.findUnique({
    where: { id: userId },
    include: { portfolios: true, settings: true },
  })
  if (!user) {
    throw new Error(`No user found: ${userId}`)
  }
  return user
}
