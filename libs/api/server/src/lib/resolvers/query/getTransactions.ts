import { TransactionSchemaFragment, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { AuthorizationError } from "@perfolio/util/errors"

const resolver: ResolverFn<TransactionSchemaFragment[], unknown, Context, { userId: string }> =
  async (_parent, { userId }, ctx, _info) => {
    const { sub } = ctx.authenticateUser()
    if (sub !== userId) {
      throw new AuthorizationError("getTransactions", "wrong user id")
    }

    const transactions = await ctx.dataSources.fauna.getTransactions(userId)
    return transactions.map((t) => ({
      ...t.data,
      id: t.id,
    }))
  }

export const getTransactions = resolver
