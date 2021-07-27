import { Resolvers } from "@perfolio/api/graphql"
import { Context } from "./context"
import { getExchanges } from "./resolvers/query/getExchanges"
import { search } from "./resolvers/query/search"
import { getCompany } from "./resolvers/query/getCompany"
import { getUserSettings } from "./resolvers/query/getUserSettings"
import { getTransactions } from "./resolvers/query/getTransactions"
import { getPortfolioHistory } from "./resolvers/query/getPortfolioHistory"
import { getCompanyFromIsin } from "./resolvers/query/getCompanyFromIsin"
import { logo } from "./resolvers/company/logo"
import { currentValue } from "./resolvers/company/currentValue"
import { asset } from "./resolvers/transaction/asset"
import { company as stockCompany } from "./resolvers/stock/company"
import { subscribeToNewsletter } from "./resolvers/mutation/subscribeToNewsletter"
import { createTransaction } from "./resolvers/mutation/createTransaction"
import { deleteTransaction } from "./resolvers/mutation/deleteTransaction"
import { createUserSettings } from "./resolvers/mutation/createUserSettings"
import { updateUserSettings } from "./resolvers/mutation/updateUserSettings"

export const resolvers: Resolvers<Context> = {
  Query: {
    // @ts-expect-error Missing fields will be handled by the Company resolver
    getCompany,
    getExchanges,
    search,
    getUserSettings,
    getTransactions,
    getPortfolioHistory,
    // @ts-expect-error Missing fields will be handled by the SearchResult resolver

    getCompanyFromIsin,
  },

  Company: {
    logo,
    currentValue,
  },
  Stock: {
    // @ts-expect-error Missing fields will be handled by the Company resolver
    company: stockCompany,
  },

  Mutation: {
    createTransaction,
    deleteTransaction,
    createUserSettings,
    updateUserSettings,
    subscribeToNewsletter,
  },
  Asset: {
    __resolveType(obj) {
      if ("ticker" in obj) {
        return "Stock"
      }
      if ("name" in obj) {
        return "Crypto"
      }
      return null
    },
  },

  Transaction: {
    // @ts-expect-error Missing fields will be handled by the Asset resolver
    asset,
  },
}
