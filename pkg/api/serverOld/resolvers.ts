import { Resolvers, } from "@perfolio/pkg/api/graphql"
import { Context, } from "./context"
import { country, } from "./resolvers/company/country"
import { sector, } from "./resolvers/company/sector"
import { createSettings, } from "./resolvers/mutation/createSettings"
import { createTransaction, } from "./resolvers/mutation/createTransaction"
import { deleteTransaction, } from "./resolvers/mutation/deleteTransaction"
import { subscribeToNewsletter, } from "./resolvers/mutation/subscribeToNewsletter"
import { updateSettings, } from "./resolvers/mutation/updateSettings"
import { getAbsolutePortfolioHistory, } from "./resolvers/portfolio/absoluteHistory"
import { getRelativePortfolioHistory, } from "./resolvers/portfolio/relativeHistory"
import { getTransactionsOfPortfolio, } from "./resolvers/portfolio/transaction"
import { exchanges, } from "./resolvers/query/exchanges"
import { getPortfolioById, } from "./resolvers/query/portfolio"
import { stockPricesAtExchange, } from "./resolvers/query/stockPricesAtExchange"
import { user, } from "./resolvers/query/user"
import { getExchangeFromMic, } from "./util/getExchangeFromMic"
import { getExchangeTradedAsset, } from "./util/getExchangeTradedAsset"

import { getPortfoliosFromUser, } from "./resolvers/user/portfolios"
import { getSettingsFromUser, } from "./resolvers/user/settings"

export const resolvers: Resolvers<Context> = {
  Query: {
    exchangeTradedAsset: (_parent, { id, }, ctx,) => getExchangeTradedAsset(ctx, id,),
    exchanges,
    stockPricesAtExchange,

    // @ts-expect-error Remaining fields are resolved later
    portfolio: (_parent, { portfolioId, }, ctx,) => getPortfolioById(ctx, portfolioId,),
    // @ts-expect-error Remaining fields are resolved later
    user,
  },

  User: {
    // @ts-expect-error Remaining fields are resolved later

    portfolios: ({ id, }, _args, ctx,) => getPortfoliosFromUser(ctx, id,),
    // @ts-expect-error Remaining fields are resolved later

    settings: ({ id, }, _args, ctx,) => getSettingsFromUser(ctx, id,),
  },
  Portfolio: {
    // @ts-expect-error Remaining fields are resolved later
    transactions: ({ id, }, _args, ctx,) => getTransactionsOfPortfolio(ctx, id,),
    relativeHistory: ({ id, }, { since, }, ctx,) =>
      getRelativePortfolioHistory(ctx, id, since ?? undefined,),

    // @ts-expect-error Remaining fields are resolved later
    absoluteHistory: ({ id, }, _args, ctx,) => getAbsolutePortfolioHistory(ctx, id,),
  },

  Settings: {
    defaultExchange: ({ defaultExchangeMic, }, _args, ctx,) =>
      getExchangeFromMic(ctx, defaultExchangeMic,),
  },
  AssetHistory: {
    asset: ({ assetId, }, _args, ctx,) => getExchangeTradedAsset(ctx, assetId,),
  },
  Mutation: {
    // @ts-expect-error Remaining fields are resolved later
    createTransaction,
    deleteTransaction,
    createSettings,
    updateSettings,
    subscribeToNewsletter,
  },
  Asset: {
    __resolveType(parent,) {
      return parent.__typename
    },
  },
  ExchangeTradedAsset: {
    __resolveType(parent,) {
      if ("sector" in parent) {
        return "Company"
      }
      return undefined
    },
  },
  Stock: {
    __resolveType() {
      return "Company"
    },
    country,
  },

  Company: {
    sector,
  },
  Transaction: {
    asset: ({ assetId, }, _args, ctx,) => getExchangeTradedAsset(ctx, assetId,),
  },
}
