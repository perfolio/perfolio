import { Portfolio, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const portfolio: ResolverFn<Omit<Portfolio,"user"|"transactions">|null, unknown, Context, { portfolioId: string }> = async (
  _parent,
  { portfolioId },
  ctx,
  _info,
) => {
  const portfolio = await ctx.dataSources.prisma.portfolio.findUnique({
    where: { id: portfolioId },
  })
  if (!portfolio){
    throw new Error(`Portfolio not found: ${portfolioId}`)
  }
  await ctx.authorizeUser(({ sub }) => sub === portfolio.userId)

  return portfolio
}
