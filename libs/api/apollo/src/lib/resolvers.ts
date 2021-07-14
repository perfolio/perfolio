import { Resolvers } from "@perfolio/api/graphql"
import { Context } from "./context"
import { getExchanges } from "./resolvers/query/getExchanges"
import { searchCompanies } from "./resolvers/query/searchCompanies"
import { getCompany } from "./resolvers/query/getCompany"
import { getUserSettings } from "./resolvers/query/getUserSettings"
import { logo } from "./resolvers/company/logo"
import { exchange } from "./resolvers/company/exchange"
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
  },

  Company: {
    logo,
    exchange,
  },

  Mutation: {
    createTransaction,
    deleteTransaction,
    createUserSettings,
    updateUserSettings,
    subscribeToNewsletter,
  },
}
