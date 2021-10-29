import { Context } from "../../context"
import { TransactionSchemaFragment } from "@perfolio/pkg/api/graphql"

export async function getTransactionsOfPortfolio(
  ctx: Context,
  portfolioId: string,
): Promise<TransactionSchemaFragment[]> {
  return await ctx.prisma.transaction.findMany({ where: { portfolioId } })
}
