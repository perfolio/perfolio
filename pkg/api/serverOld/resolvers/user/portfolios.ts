import { Portfolio, } from "@perfolio/pkg/api"
import { Context, } from "../../context"

export const getPortfoliosFromUser = async (
  ctx: Context,
  userId: string,
): Promise<Omit<Portfolio, "user" | "transactions" | "relativeHistory" | "absoluteHistory">[]> => {
  await ctx.authorizeUser(({ sub, },) => sub === userId)

  return await ctx.dataSources.prisma.portfolio.findMany({
    where: { userId, },
  },)
}
