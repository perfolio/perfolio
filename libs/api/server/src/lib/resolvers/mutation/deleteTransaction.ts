import { ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const deleteTransaction: ResolverFn<string, unknown, Context, { transactionId: string }> =
  async (_parent, { transactionId }, ctx, _info) => {
    await ctx.authenticateUser()

    const transaction = await ctx.dataSources.prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        portfolio: true,
      },
    })
    if (!transaction) {
      throw new Error("No transaction found")
    }

    await ctx.authorizeUser(({ sub }) => sub === transaction.portfolio.userId)

    await ctx.dataSources.prisma.transaction.delete({ where: { id: transactionId } })
    return transaction.id
  }
