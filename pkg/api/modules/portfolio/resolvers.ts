import { newId } from "@perfolio/pkg/id"
import {
  ExchangeTradedAssetModel,
  SettingsModel,
  TransactionModel,
} from "@perfolio/pkg/integrations/prisma"
import { Time } from "@perfolio/pkg/util/time"
import { Context } from "../../context"
import { AbsoluteAssetHistory, Resolvers } from "../../generated/schema-types"

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
    absoluteHistory: async (portfolio, _args, ctx) => {
      await ctx.authorizeUser((claims) => claims.sub === portfolio.userId)

      const transactions = await ctx.dataSources.db.transaction.findMany({
        where: { portfolioId: portfolio.id },
        include: { asset: true },
      })

      transactions.sort((a, b) => a.executedAt - b.executedAt)

      const key = ctx.cache.key(...transactions)
      const cachedValue = await ctx.cache.get<AbsoluteAssetHistory>(key)
      if (cachedValue) {
        ctx.logger.debug("Cache hit", { key, cachedValue })
        return cachedValue
      }

      const assets: { [assetId: string]: ExchangeTradedAssetModel } = {}
      for (const tx of transactions) {
        assets[tx.assetId] = tx.asset
      }

      /**
       * Aggregate transactions by assets
       */
      const transactionsByAsset: {
        [assetId: string]: TransactionModel[]
      } = {}
      for (const tx of transactions) {
        if (!transactionsByAsset[tx.assetId]) {
          transactionsByAsset[tx.assetId] = []
        }

        transactionsByAsset[tx.assetId].push(tx)
      }

      const prices = await Promise.all(
        Object.values(assets).map(async (asset) => {
          const foundIsin = await ctx.dataSources.openFigi.findIsin({
            isin: asset.isin,
          })
          if (!foundIsin) {
            throw new Error(`Unable to find isin: ${asset.isin}`)
          }

          return {
            assetId: asset.id,
            history: await ctx.dataSources.iex.getHistory(
              `${foundIsin.ticker}-${foundIsin.exchCode}`,
            ),
          }
        }),
      )

      const historyByAsset: { [assetId: string]: { [time: number]: number } } = {}
      for (const price of prices) {
        historyByAsset[price.assetId] = price.history
      }

      const history: { [assetId: string]: { time: number; quantity: number; value?: number }[] } =
        {}

      const startDay = Time.fromTimestamp(transactions[0].executedAt)
      for (
        const [assetId, transactions] of Object.entries(
          transactionsByAsset,
        )
      ) {
        if (!history[assetId]) {
          history[assetId] = []
        }

        let quantity = 0
        for (
          let currentDay = startDay;
          currentDay.unix() <= Date.now() / 1000;
          currentDay = currentDay.nextDay()
        ) {
          /**
           * Get transactions that happened on this day
           */
          const txsToday = transactions.filter((tx) =>
            Time.fromTimestamp(tx.executedAt).equals(currentDay)
          )

          for (const tx of txsToday) {
            quantity += tx.volume
          }
          history[assetId]?.push({
            time: currentDay.unix(),
            quantity,
            value: historyByAsset[assetId][currentDay.unix()],
          })
        }
      }

      const value = Object.entries(history).map(([assetId, history]) => ({
        assetId,
        history,
      }))
      // await ctx.cache.set("2h", { key, value })
      return value
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
      ctx.authenticateUser()
      const portfolio = await ctx.dataSources.db.portfolio.findUnique({
        where: { id: portfolioId },
      })
      if (!portfolio) {
        return undefined
      }
      ctx.authorizeUser((claims) => claims.sub === portfolio.userId)
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
