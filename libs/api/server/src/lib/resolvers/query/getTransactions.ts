import { TransactionSchemaFragment, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { AuthorizationError } from "@perfolio/util/errors"

export const getTransactions: ResolverFn<
  TransactionSchemaFragment[],
  unknown,
  Context,
  { userId: string }
> = async (_parent, { userId }, ctx, _info) => {
  const { sub } = await ctx.authenticateUser()

  if (sub !== userId) {
    throw new AuthorizationError("getTransactions", "wrong user id")
  }

  return await ctx.dataSources.prisma.transaction.findMany({ where: { userId } })
}
