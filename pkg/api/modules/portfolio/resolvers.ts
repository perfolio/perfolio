import { rebalance, toTimeseries } from "@perfolio/pkg/finance/returns"
import { newId } from "@perfolio/pkg/id"
import {
  ExchangeTradedAssetModel,
  SettingsModel,
  TransactionModel,
} from "@perfolio/pkg/integrations/prisma"
import { Time } from "@perfolio/pkg/util/time"
import { NIL } from "uuid"
import { Context } from "../../context"
import { AbsoluteAssetHistory, Resolvers } from "../../generated/schema-types"
import { resolvers as assetResolvers } from "../assets/resolvers"
import { getAbsoluteHistory } from "./util/getAbsoluteHistory"

export const resolvers: Resolvers<Context> = {
  User: {
    portfolio: async (user, { portfolioId }, ctx) => {
      ctx.authorizeUser((claims) => claims.sub === user.id)
      return (
        (await ctx.dataSources.db.portfolio.findUnique({
          where: { id: portfolioId },
        })) ?? undefined
      )
    },
    portfolios: async (user, _args, ctx) => {
      ctx.authorizeUser((claims) => claims.sub === user.id)
      return await ctx.dataSources.db.portfolio.findMany({
        where: {
          userId: user.id,
        },
      })
    },
  },

  AbsoluteAssetHistory: {
    asset: async (history, _args, ctx) => {
      ctx.authorizeUser(() => true)
      const asset = await ctx.dataSources.db.exchangeTradedAsset.findUnique({
        where: { id: history.assetId },
      })
      if (!asset) {
        throw new Error(`Asset was not found in db: ${history.assetId}`)
      }
      return asset
    },
  },
  Portfolio: {
    user: async (portfolio, _args, ctx) => {
      ctx.authenticateUser()
      const p = await ctx.dataSources.db.portfolio.findUnique({
        where: { id: portfolio.id },
        include: { user: true },
      })
      if (!p) {
        throw new Error(
          `Portfolio does not have a user attached, that should never be possible but you're out of luck.`,
        )
      }
      ctx.authorizeUser((claims) => claims.sub === p.user.id)
      return p.user
    },
    transactions: async (portfolio, _args, ctx) => {
      ctx.authorizeUser((claims) => claims.sub === portfolio.userId)
      return await ctx.dataSources.db.transaction.findMany({
        where: {
          portfolioId: portfolio.id,
        },
      })
    },

    relativeHistory: async (portfolio, { since }, ctx) => {
      await ctx.authorizeUser((claims) => claims.sub === portfolio.userId)
      console.time(portfolio.id)
      let absoluteHistory = await getAbsoluteHistory(portfolio, ctx)
      console.timeLog(portfolio.id, "after absolute")
      const series = toTimeseries(absoluteHistory, since)
      const index = rebalance(series)
      const value = Object.entries(index)
        .map(([time, value]) => ({
          time: Number(time),
          value,
        }))
        .filter(({ value }) => !Number.isNaN(value))
      console.timeEnd(portfolio.id)
      return value
    },

    absoluteHistory: async (portfolio, _args, ctx) => {
      await ctx.authorizeUser((claims) => claims.sub === portfolio.userId)

      return await getAbsoluteHistory(portfolio, ctx)
    },
  },
  Transaction: {
    asset: async (transaction, _args, ctx) => {
      ctx.authorizeUser(() => true)
      const asset = await ctx.dataSources.db.exchangeTradedAsset.findUnique({
        where: { id: transaction.assetId },
      })
      if (!asset) {
        throw new Error(`Asset was not found in db: ${transaction.assetId}`)
      }
      return asset
    },
  },
  Query: {
    portfolio: async (_root, { portfolioId }, ctx) => {
      await ctx.authenticateUser()
      const portfolio = await ctx.dataSources.db.portfolio.findUnique({
        where: { id: portfolioId },
      })
      if (!portfolio) {
        return undefined
      }
      await ctx.authorizeUser((claims) => claims.sub === portfolio.userId)
      return portfolio
    },
  },
  Mutation: {
    createPortfolio: async (_root, { portfolio }, ctx) => {
      ctx.authorizeUser((claims) => claims.sub === portfolio.userId)
      const createdPortfolio = await ctx.dataSources.db.portfolio.create({
        data: {
          ...portfolio,
          primary: portfolio.primary || false,
        },
      })
      return createdPortfolio
    },
    updatePortfolio: async (_root, { portfolio }, ctx) => {
      ctx.authenticateUser()
      const existingPortfolio = await ctx.dataSources.db.portfolio.findUnique({
        where: { id: portfolio.id },
      })
      if (!existingPortfolio) {
        throw new Error(`No portfolio exists with id: ${portfolio.id}`)
      }
      ctx.authorizeUser((claims) => claims.sub === existingPortfolio.userId)
      return await ctx.dataSources.db.portfolio.update({
        where: { id: portfolio.id },
        data: portfolio,
      })
    },
    deletePortfolio: async (_root, { portfolioId }, ctx) => {
      ctx.authenticateUser()

      const portfolio = await ctx.dataSources.db.portfolio.findUnique({
        where: { id: portfolioId },
      })
      if (!portfolio) {
        throw new Error(`No portfolio exists with id: ${portfolioId}`)
      }
      ctx.authorizeUser((claims) => claims.sub === portfolio.userId)

      return await ctx.dataSources.db.portfolio.delete({
        where: { id: portfolioId },
      })
    },
    createTransaction: async (_root, { transaction }, ctx) => {
      const portfolio = await ctx.dataSources.db.portfolio.findUnique({
        where: { id: transaction.portfolioId },
      })
      if (!portfolio) {
        throw new Error(`Portfolio ${transaction.portfolioId} does not exist`)
      }
      const { sub: userId } = await ctx.authorizeUser(
        (claims) => claims.sub === portfolio.userId,
      )

      let settings: SettingsModel | null = null
      if (!transaction.mic) {
        settings = await ctx.dataSources.db.settings.findUnique({
          where: { userId },
        })
        if (!settings) {
          throw new Error(`No settings found for user: ${userId}`)
        }
      }
      let mic = transaction.mic ?? settings?.defaultExchangeId!

      const asset = await ctx.dataSources.db.exchangeTradedAsset.findUnique({
        where: { id: transaction.assetId },
      })
      if (!asset) {
        throw new Error(`No asset with id found: ${transaction.assetId}`)
      }

      return await ctx.dataSources.db.transaction.create({
        data: {
          id: newId("transaction"),
          ...transaction,
          mic,
        },
      })
    },
    updateTransaction: async (_root, { transaction }, ctx) => {
      const existingTransaction = await ctx.dataSources.db.transaction.findUnique({
        where: { id: transaction.id },
        include: { portfolio: true },
      })
      if (!existingTransaction) {
        throw new Error(`Transaction ${transaction.id} does not exist`)
      }
      ctx.authorizeUser(
        (claims) => claims.sub === existingTransaction.portfolio.userId,
      )

      return await ctx.dataSources.db.transaction.update({
        where: {
          id: transaction.id,
        },
        data: transaction,
      })
    },
    deleteTransaction: async (_root, { transactionId }, ctx) => {
      const transaction = await ctx.dataSources.db.transaction.findUnique({
        where: { id: transactionId },
        include: { portfolio: true },
      })
      if (!transaction) {
        throw new Error(`Transaction ${transactionId} does not exist`)
      }
      ctx.authorizeUser(
        (claims) => claims.sub === transaction.portfolio.userId,
      )
      return await ctx.dataSources.db.transaction.delete({
        where: { id: transactionId },
      })
    },
  },
}
