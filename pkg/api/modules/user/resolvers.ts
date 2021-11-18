import { Resolvers } from "../../generated/schema-types"
import { Context } from "../../context"

export const resolvers: Resolvers<Context> = {
  Query: {
    user: async (_parent, { userId }, ctx) => {
      return await ctx.dataSources.db.user.findUnique({ where: { id: userId } })
    },
  },
  User: {
    id: (user) => user.id,
    stripeCustomerId: (user) => user.stripeCustomerId,
  },
}
