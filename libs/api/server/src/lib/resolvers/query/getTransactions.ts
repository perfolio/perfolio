import { TransactionSchemaFragment, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const getTransactions: ResolverFn<
  TransactionSchemaFragment[],
  unknown,
  Context,
  { userId: string }
> = async (_parent, { userId }, ctx, _info) => {
  await ctx.authorizeUser(({ sub }) => sub === userId)

  return await ctx.dataSources.prisma.transaction.findMany({ where: { userId } })
}
