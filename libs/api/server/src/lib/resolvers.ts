import { Resolvers } from "@perfolio/api/graphql"
import { Context } from "./context"
import { getExchanges } from "./resolvers/query/getExchanges"
import { searchCompanies } from "./resolvers/query/searchCompanies"
import { getCompany } from "./resolvers/query/getCompany"
import { getUserSettings } from "./resolvers/query/getUserSettings"
import { getTransactions } from "./resolvers/query/getTransactions"
import { getPortfolioHistory } from "./resolvers/query/getPortfolioHistory"
import { logo } from "./resolvers/company/logo"
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
    searchCompanies,
    getUserSettings,
    getTransactions,
    getPortfolioHistory,
  },

  Company: {
    logo,
  },

  Mutation: {
    createTransaction,
    deleteTransaction,
    createUserSettings,
    updateUserSettings,
    subscribeToNewsletter,
  },
  Asset: {
    __resolveType(obj, _ctx, _info) {
      return obj.__typename ?? null
    },
  },
}
