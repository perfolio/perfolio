import { CreateTransaction, ResolverFn } from "@perfolio/api/graphql"
import { Transaction as TransactionModel } from "@perfolio/integrations/prisma"
import { Context } from "../../context"
import { idGenerator } from "@perfolio/id"
export const createTransaction: ResolverFn<
  TransactionModel,
  unknown,
  Context,
  { transaction: CreateTransaction }
> = async (_parent, { transaction }, ctx, _info) => {
  await ctx.authorizeUser(({ sub }) => sub === transaction.userId)

  const settings = await ctx.dataSources.prisma.settings.findUnique({
    where: { userId: transaction.userId },
  })
  if (!settings) {
    throw new Error(`No user settings found`)
  }

  const isin = transaction.assetId
  const isinMap = await ctx.dataSources.iex.getIsinMapping(isin)
  const exchange = await ctx.dataSources.iex.getExchange({ mic: settings.defaultExchangeMic })
  if (!exchange) {
    throw new Error("Invalid exchange")
  }

  const isTradedAtExchange = isinMap.some((m) => m.exchange === exchange.abbreviation)

  if (!isTradedAtExchange) {
    throw new Error(`Asset ${transaction.assetId} is currently not traded at ${exchange.name}`)
  }

  return await ctx.dataSources.prisma.transaction.create({
    data: { ...transaction, id: idGenerator.id("transaction") },
  })
}
