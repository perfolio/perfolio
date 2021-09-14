import { Resolvers } from "@perfolio/api/graphql"
import { Context } from "./context"
import { relativePortfolioHistory } from "./resolvers/query/relativePortfolioHistory"
import { exchanges } from "./resolvers/query/exchanges"
import { search } from "./resolvers/query/search"
import { user } from "./resolvers/query/user"
import { portfolioHistory } from "./resolvers/query/portfolioHistory"
import { stockPricesAtExchange } from "./resolvers/query/stockPricesAtExchange"
import { getExchangeTradedAsset } from "./util/getExchangeTradedAsset"
import { getExchangeFromMic } from "./util/getExchangeFromMic"
import { sector } from "./resolvers/companyStock/sector"
import { country } from "./resolvers/companyStock/country"
import { subscribeToNewsletter } from "./resolvers/mutation/subscribeToNewsletter"
import { createTransaction } from "./resolvers/mutation/createTransaction"
import { deleteTransaction } from "./resolvers/mutation/deleteTransaction"
import { createSettings } from "./resolvers/mutation/createSettings"
import { updateSettings } from "./resolvers/mutation/updateSettings"

export const resolvers: Resolvers<Context> = {
  Query: {
    exchangeTradedAsset: (_parent, { id }, ctx) => getExchangeTradedAsset(ctx, id),
    relativePortfolioHistory: (_parent, { portfolioId, since }, ctx) =>
      relativePortfolioHistory(ctx, portfolioId, since ?? undefined),
    exchanges,
    search,
    // @ts-expect-error Remaining fields are resolved later

    getTransactions,
    // @ts-expect-error Remaining fields are resolved later

    portfolioHistory: (_parent, { userId }, ctx) => portfolioHistory(ctx, userId),
    stockPricesAtExchange,
    // @ts-expect-error Remaining fields are resolved later

    user,
  },

  Settings: {
    defaultExchange: ({ defaultExchangeMic }, _args, ctx) =>
      getExchangeFromMic(ctx, defaultExchangeMic),
  },
  AssetHistory: {
    asset: ({ assetId }, _args, ctx) => getExchangeTradedAsset(ctx, assetId),
  },
  Mutation: {
    // @ts-expect-error Remaining fields are resolved later
    createTransaction,
    deleteTransaction,
    createSettings,
    updateSettings,
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
