import { Portfolio, ResolverFn } from "@perfolio/api/graphql"
import { User as UserModel } from "@perfolio/integrations/prisma"
import { Context } from "../../context"
export const getUser: ResolverFn<UserModel & {portfolios: Portfolio[]} | null, unknown, Context, { userId: string }> = async (
  _parent,
  { userId },
  ctx,
  _info,
) => {
  await ctx.authorizeUser(({ sub }) => sub === userId)

  return await ctx.dataSources.prisma.user.findUnique({
    where: { id: userId },
    include: { portfolios: true },
  })
}
