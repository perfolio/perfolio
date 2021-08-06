import { ResolverFn } from "@perfolio/api/graphql"
import { AuthorizationError } from "@perfolio/util/errors"
import { Context } from "../../context"

export const deleteTransaction: ResolverFn<string, unknown, Context, { transactionId: string }> =
  async (_parent, { transactionId }, ctx, _info) => {
    const { sub } = await ctx.authenticateUser()

    const transaction = await ctx.dataSources.prisma.transaction.findUnique({
      where: { id: transactionId },
    })
    if (!transaction) {
      throw new Error("No transaction found")
    }

    if (sub !== transaction.userId) {
      throw new AuthorizationError("deleteTransaction", "wrong user id")
    }

    await ctx.dataSources.prisma.transaction.delete({ where: { id: transactionId } })
    return transaction.id
  }
