import { CreateTransaction, ResolverFn, Transaction } from "@perfolio/api/graphql"
import { AuthorizationError } from "@perfolio/util/errors"
import { Context } from "../../context"

export const createTransaction: ResolverFn<
  Transaction,
  unknown,
  Context,
  { transaction: CreateTransaction }
> = async (_parent, { transaction }, ctx, _info) => {
  const { sub } = ctx.authenticateUser()
  if (sub !== transaction.userId) {
    throw new AuthorizationError("createTransaction", "wrong user id")
  }
  return await ctx.dataSources.fauna.createTransaction(transaction)
}
