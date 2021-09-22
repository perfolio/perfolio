import { Context } from "../../context"
import { Portfolio } from "@perfolio/api/graphql"

export const getPortfoliosFromUser = async (
  ctx: Context,
  userId: string,
): Promise<Omit<Portfolio, "user" | "transactions" | "relativeHistory" | "absoluteHistory">[]> => {
  await ctx.authorizeUser(({ sub }) => sub === userId)

  return await ctx.dataSources.prisma.portfolio.findMany({
    where: { userId },
  })
}
