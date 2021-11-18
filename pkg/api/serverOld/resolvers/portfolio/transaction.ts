import { TransactionSchemaFragment, } from "@perfolio/pkg/api/graphql"
import { Context, } from "../../context"

export async function getTransactionsOfPortfolio(
  ctx: Context,
  portfolioId: string,
): Promise<TransactionSchemaFragment[]> {
  return await ctx.prisma.transaction.findMany({ where: { portfolioId, }, },)
}
