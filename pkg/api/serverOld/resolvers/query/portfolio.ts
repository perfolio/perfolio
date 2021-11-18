import { Context, } from "../../context"

export const getPortfolioById = async (ctx: Context, portfolioId: string,) => {
  const portfolio = await ctx.dataSources.prisma.portfolio.findUnique({
    where: { id: portfolioId, },
  },)
  if (!portfolio) {
    throw new Error(`Portfolio not found: ${portfolioId}`,)
  }
  await ctx.authorizeUser(({ sub, },) => sub === portfolio.userId)

  return portfolio
}
