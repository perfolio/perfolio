import { Resolvers } from "@perfolio/api/graphql"
import { Context } from "./context"

export const resolvers: Resolvers<Context> = {
  Query: {
    getCompany: (_parent, { ticker }, ctx) => ctx.dataSources.iex.getCompany(ticker),
  },
  Company: {
      logo: (company, _, ctx) => ctx.dataSources.iex.getLogo(company.ticker)
  }
}
