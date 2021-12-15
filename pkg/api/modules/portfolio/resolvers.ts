import { rebalance, toTimeseries } from "@perfolio/pkg/finance/returns"
import { newId } from "@perfolio/pkg/id"
import { SettingsModel } from "@perfolio/pkg/integrations/prisma"
import { AuthorizationError } from "@perfolio/pkg/util/errors"
import { Context } from "../../context"
import { Company, Crypto, Etf, Resolvers } from "../../generated/schema-types"
import { getAbsoluteHistory } from "./util/getAbsoluteHistory"

export const resolvers: Resolvers<Context> = {
  User: {
    portfolio: async (user, { portfolioId }, ctx) => {
      ctx.authorizeUser(["read:portfolio"], (claims) => {
        if (claims.sub !== user.id) {
          throw new AuthorizationError("Not allowed to read this portfolio")
        }
      })
      return (
        (await ctx.dataSources.db.portfolio.findUnique({
          where: { id: portfolioId },
        })) ?? undefined
      )
    },
    portfolios: async (user, _args, ctx) => {
      ctx.authorizeUser(["read:portfolio"], (claims) => {
        if (claims.sub !== user.id) {
          throw new AuthorizationError("Not allowed to read this portfolio")
        }
      })
      return await ctx.dataSources.db.portfolio.findMany({
        where: {
          userId: user.id,
        },
      })
    },
  },

  AbsoluteAssetHistory: {
    asset: async (history, _args, ctx) => {
      ctx.authorizeUser(["read:absoluteAssetHistory"])
      const asset = await ctx.dataSources.db.exchangeTradedAsset.findUnique({
        where: { id: history.assetId },
      })
      if (!asset) {
        throw new Error(`Asset was not found in db: ${history.assetId}`)
      }
      return asset as Company | Crypto | Etf
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
      ctx.authorizeUser(["read:user"], (claims) => {
        if (claims.sub !== p.userId) {
          throw new AuthorizationError("Not allowed to read user")
        }
      })
      return p.user
    },
    transactions: async (portfolio, _args, ctx) => {
      ctx.authorizeUser(["read:transaction"], (claims) => {
        if (claims.sub !== portfolio.userId) {
          throw new AuthorizationError("Not allowed to read this portfolio")
        }
      })
      return await ctx.dataSources.db.transaction.findMany({
        where: {
          portfolioId: portfolio.id,
        },
      })
    },

    relativeHistory: async (portfolio, { since }, ctx) => {
      ctx.authorizeUser(["read:portfolio", "read:relativePortfolioHistory"], (claims) => {
        if (claims.sub !== portfolio.userId) {
          throw new AuthorizationError("Not allowed to read this portfolio")
        }
      })
      let absoluteHistory = await getAbsoluteHistory(portfolio, ctx)
      const series = toTimeseries(absoluteHistory, since)
      const index = rebalance(series)
      const value = Object.entries(index)
        .map(([time, value]) => ({
          time: Number(time),
          value,
        }))
        .filter(({ value }) => !Number.isNaN(value))
      return value
    },
    // @ts-ignore
    absoluteHistory: async (portfolio, { since }, ctx) => {
      ctx.authorizeUser(["read:portfolio", "read:absolutePortfolioHistory"], (claims) => {
        if (claims.sub !== portfolio.userId) {
          throw new AuthorizationError("Not allowed to read this portfolio")
        }
      })

      const history = await getAbsoluteHistory(portfolio, ctx)
      if (since) {
        for (const assetHistory of history) {
          assetHistory.history = assetHistory.history.filter((t) => t.time >= since)
        }
      }
      return history
    },
  },
  Transaction: {
    asset: async (transaction, _args, ctx) => {
      ctx.authorizeUser(["read:transaction", "read:asset"])
      const asset = await ctx.dataSources.db.exchangeTradedAsset.findUnique({
        where: { id: transaction.assetId },
      })
      if (!asset) {
        throw new Error(`Asset was not found in db: ${transaction.assetId}`)
      }
      return asset as Company | Crypto | Etf
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
      await ctx.authorizeUser(["read:portfolio"], (claims) => {
        if (claims.sub !== portfolio.userId) {
          throw new AuthorizationError("Not allowed to access portfolio")
        }
      })
      return portfolio
    },
  },
  Mutation: {
    createPortfolio: async (_root, { portfolio }, ctx) => {
      await ctx.authorizeUser(["create:portfolio"], (claims) => {
        if (claims.sub !== portfolio.userId) {
          throw new AuthorizationError("Not allowed to access portfolio")
        }
      })
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
      await ctx.authorizeUser(["update:portfolio"], (claims) => {
        if (claims.sub !== existingPortfolio.userId) {
          throw new AuthorizationError("Not allowed to access portfolio")
        }
      })
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
      await ctx.authorizeUser(["delete:portfolio"], (claims) => {
        if (claims.sub !== portfolio.userId) {
          throw new AuthorizationError("Not allowed to access portfolio")
        }
      })

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
      const { sub: userId } = await ctx.authorizeUser(["create:transaction"], (claims) => {
        if (claims.sub !== portfolio.userId) {
          throw new AuthorizationError("Not allowed to access portfolio")
        }
      })

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
      await ctx.authorizeUser(["update:transaction"], (claims) => {
        if (claims.sub !== existingTransaction.portfolio.userId) {
          throw new AuthorizationError("Not allowed to access portfolio")
        }
      })
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
      await ctx.authorizeUser(["delete:transaction"], (claims) => {
        if (claims.sub !== transaction.portfolio.userId) {
          throw new AuthorizationError("Not allowed to access portfolio")
        }
      })
      return await ctx.dataSources.db.transaction.delete({
        where: { id: transactionId },
      })
    },
  },
}
