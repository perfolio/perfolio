import { Resolvers } from "@perfolio/api/graphql"
import { Context } from "./context"
import { exchanges } from "./resolvers/query/exchanges"
import { search } from "./resolvers/query/search"
import { user } from "./resolvers/query/user"
import { getRelativePortfolioHistory } from "./resolvers/portfolio/relativeHistory"
import { getAbsolutePortfolioHistory } from "./resolvers/portfolio/absoluteHistory"
import { getTransactionsOfPortfolio } from "./resolvers/portfolio/transaction"
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
import { getPortfolioById } from "./resolvers/query/portfolio"

export const resolvers: Resolvers<Context> = {
  Query: {
    exchangeTradedAsset: (_parent, { id }, ctx) => getExchangeTradedAsset(ctx, id),
    exchanges,
    search,
    stockPricesAtExchange,

    // @ts-expect-error Remaining fields are resolved later
    portfolio: (_parent, { portfolioId }, ctx) => getPortfolioById(ctx, portfolioId),
    // @ts-expect-error Remaining fields are resolved later
    user,
  },
  Portfolio: {
    // @ts-expect-error Remaining fields are resolved later
    transactions: ({ id }, _args, ctx) => getTransactionsOfPortfolio(ctx, id),
    relativeHistory: ({ id }, { since }, ctx) =>
      getRelativePortfolioHistory(ctx, id, since ?? undefined),

    // @ts-expect-error Remaining fields are resolved later
    absoluteHistory: ({ id }, _args, ctx) => getAbsolutePortfolioHistory(ctx, id),
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
