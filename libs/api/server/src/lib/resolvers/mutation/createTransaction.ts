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
  const { sub } = await ctx.authenticateUser()
  if (sub !== transaction.userId) {
    throw new AuthorizationError("createTransaction", "wrong user id")
  }

  const userSettings = await ctx.dataSources.prisma.userSettings.findUnique({
    where: { userId: transaction.userId },
  })
  if (!userSettings) {
    throw new Error(`No user settings found`)
  }

  const isin = transaction.assetId
  const isinMap = await ctx.dataSources.iex.getIsinMapping(isin)
  const exchange = await ctx.dataSources.iex.getExchange({ mic: userSettings.defaultExchange })
  if (!exchange) {
    throw new Error("Invalid exchange")
  }

  const isTradedAtExchange = isinMap.some((m) => m.exchange === exchange.abbreviation)

  if (!isTradedAtExchange) {
    throw new Error(`Asset ${transaction.assetId} is currently not traded at ${exchange.name}`)
  }

  return await ctx.dataSources.prisma.transaction.create({ data: transaction })
}
