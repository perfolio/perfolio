import { Resolvers } from "@perfolio/api/graphql"
import { Context } from "./context"
export const resolvers: Resolvers<Context> = {
  Query: {
    //@ts-expect-error Typescript thinks this can not be null but it can..
    getCompany: async (_parent, { ticker }, ctx) => ctx.dataSources.iex.getCompany(ticker),
  },
  // @ts-expect-error Typescript expects all fields to be defined here.
  Company: {
    logo: (company, _args, ctx) => ctx.dataSources.iex.getLogo(company.ticker),
  },
}
