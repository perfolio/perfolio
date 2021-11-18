import { Resolvers } from "../../generated/schema-types"
import { Context } from "../../context"

export const resolvers: Resolvers<Context> = {
  User: {
    portfolio: async (_user, { portfolioId }, ctx) => {
      return await ctx.dataSources.db.portfolio.findUnique({ where: { id: portfolioId } })
    },
    portfolios: async (user, _args, ctx) => {
      return await ctx.dataSources.db.portfolio.findMany({
        where: {
          userId: user.id,
        },
      })
    },
  },
  Portfolio: {
    user: async (portfolio, _args, ctx) => {
      const p = await ctx.dataSources.db.portfolio.findUnique({
        where: { id: portfolio.id },
        include: { user: true },
      })
      return p!.user
    },
  },
  Query: {
    portfolio: async (_root, { id }, ctx) => {
      return await ctx.dataSources.db.portfolio.findUnique({ where: { id } })
    },
  },
}
