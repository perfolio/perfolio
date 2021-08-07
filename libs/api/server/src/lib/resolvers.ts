import { Resolvers } from "@perfolio/api/graphql"
import { Context } from "./context"
import { getRelativePortfolioHistory } from "./resolvers/query/getRelativePortfolioHistory"
import { getExchanges } from "./resolvers/query/getExchanges"
import { search } from "./resolvers/query/search"
import { getUserSettings } from "./resolvers/query/getUserSettings"
import { getTransactions } from "./resolvers/query/getTransactions"
import { getPortfolioHistory } from "./resolvers/query/getPortfolioHistory"
import { getStockPricesAtExchange } from "./resolvers/query/getStockPricesAtExchange"
import { getExchangeTradedAsset } from "./util/getExchangeTradedAsset"
import { sector } from "./resolvers/companyStock/sector"
import { country } from "./resolvers/companyStock/country"
import { subscribeToNewsletter } from "./resolvers/mutation/subscribeToNewsletter"
import { createTransaction } from "./resolvers/mutation/createTransaction"
import { deleteTransaction } from "./resolvers/mutation/deleteTransaction"
import { createUserSettings } from "./resolvers/mutation/createUserSettings"
import { updateUserSettings } from "./resolvers/mutation/updateUserSettings"

export const resolvers: Resolvers<Context> = {
  Query: {
    getExchangeTradedAsset: (_parent, { id }, ctx) => getExchangeTradedAsset(ctx, id),
    getRelativePortfolioHistory: (_parent, { userId, since }, ctx) =>
      getRelativePortfolioHistory(ctx, userId, since ?? undefined),
    getExchanges,
    search,
    // @ts-expect-error Remaining fields are resolved later
    getUserSettings,
    // @ts-expect-error Remaining fields are resolved later

    getTransactions,
    // @ts-expect-error Remaining fields are resolved later

    getPortfolioHistory: (_parent, { userId }, ctx) => getPortfolioHistory(ctx, userId),
    getStockPricesAtExchange,
  },

  AssetHistory: {
    asset: ({ assetId }, _args, ctx) => getExchangeTradedAsset(ctx, assetId),
  },
  Mutation: {
    // @ts-expect-error Remaining fields are resolved later
    createTransaction,
    deleteTransaction,
    createUserSettings,
    updateUserSettings,
    subscribeToNewsletter,
  },
  ExchangeTradedAsset: {
    __resolveType() {
      // TODO: Implement actual resolver logic
      return "CompanyStock"
    },
  },
  CompanyStock: {
    sector,
    country,
  },

  Transaction: {
    asset: ({ assetId }, _args, ctx) => getExchangeTradedAsset(ctx, assetId),
  },
}
