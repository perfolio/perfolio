import { CreateTransaction, ResolverFn } from "@perfolio/api/graphql"
import { Transaction as TransactionModel } from "@perfolio/integrations/prisma"
import { AuthorizationError } from "@perfolio/util/errors"
import { Context } from "../../context"

export const createTransaction: ResolverFn<
  TransactionModel,
  unknown,
  Context,
  { transaction: CreateTransaction }
> = async (_parent, { transaction }, ctx, _info) => {
  const { sub } = ctx.authenticateUser()
  if (sub !== transaction.userId) {
    throw new AuthorizationError("createTransaction", "wrong user id")
  }
  return await ctx.dataSources.prisma.createTransaction(transaction)
}
