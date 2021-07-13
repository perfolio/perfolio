import { Company, Resolvers, Exchange, UserSettings } from "@perfolio/api/graphql"
import { Context } from "./context"

export const resolvers: Resolvers<Context> = {
  Query: {
    //@ts-expect-error Typescript thinks this can not be null but it can..
    getCompany: async (_parent, { ticker }, ctx) => ctx.dataSources.iex.getCompany(ticker),
    getExchanges: async (_parent, _args, ctx) => ctx.dataSources.iex.getExchanges(),
    searchForCompanies: async (_parent, _args, _ctx) => {
      return [] as Company[]
    },
    getUserSettings: async (_parent, { userId }, ctx): Promise<UserSettings | null> => {
      const userSettings = await ctx.dataSources.fauna.getUserSettings(userId)

      return userSettings
        ? {
            userId,
            defaultCurrency: userSettings.data.defaultCurrency,
            defaultExchange: (await ctx.dataSources.iex.getExchange({
              mic: userSettings.data.defaultExchange,
            }))!,
          }
        : null
    },
  },

  // @ts-expect-error Typescript expects all fields to be defined here.
  Company: {
    logo: (company, _args, ctx) => ctx.dataSources.iex.getLogo(company.ticker),
  },

  Mutation: {
    createTransaction: async (_parent, { transaction }, ctx) => {
      return ctx.dataSources.fauna.createTransaction(transaction)
    },
    deleteTransaction: async (_parent, { transactionId }, ctx) => {
      const transaction = await ctx.dataSources.fauna.getTransaction(transactionId)
      if (!transaction) {
        throw new Error("No transaction found")
      }
      await ctx.dataSources.fauna.deleteTransaction(transaction)
      return {
        ...transaction.data,
        id: transaction.id,
      }
    },
    createUserSettings: async (_parent, { userSettings }, ctx) => {
      const exchange = await ctx.dataSources.iex.getExchange({
        mic: userSettings.defaultExchange,
      })
      if (!exchange) {
        throw new Error(`Invalid default exchange`)
      }

      const createdSettings = await ctx.dataSources.fauna.createUserSettings(userSettings)

      return {
        ...createdSettings,
        defaultExchange: exchange!,
      }
    },
    updateUserSettings: async (_parent, { userSettings }, ctx) => {
      let exchange: Exchange | null = null
      if (userSettings.defaultExchange) {
        exchange = await ctx.dataSources.iex.getExchange({
          mic: userSettings.defaultExchange,
        })
        if (!exchange) {
          throw new Error(`Invalid default exchange`)
        }
      }

      const updatedSettings = await ctx.dataSources.fauna.updateUserSettings(userSettings)
      if (!exchange) {
        exchange = await ctx.dataSources.iex.getExchange({ mic: updatedSettings.defaultExchange })
      }

      return {
        ...updatedSettings,
        defaultExchange: exchange!,
      }
    },
    subscribeToNewsletter: async (_parent, { email }, ctx) => {
      ctx.dataSources.sendgrid.subscribeToNewsletter(email)
      return email
    },
  },
}
