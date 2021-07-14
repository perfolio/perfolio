import { CreateTransaction, ResolverFn, Transaction } from "@perfolio/api/graphql"
import { AuthorizationError } from "@perfolio/util/errors"
import { Context } from "../../context"

export const createTransaction: ResolverFn<
  Transaction,
  unknown,
  Context,
  { transaction: CreateTransaction }
> = async (_parent, { transaction }, ctx, { cacheControl }) => {
  const { sub } = ctx.authenticateUser()
  if (sub !== transaction.userId) {
    throw new AuthorizationError("createTransaction", "wrong user id")
  }
  cacheControl.setCacheHint({ maxAge: 0 })
  return await ctx.dataSources.fauna.createTransaction(transaction)
}
