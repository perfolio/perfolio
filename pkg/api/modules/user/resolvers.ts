import { Context } from "../../context"
import { Resolvers } from "../../generated/schema-types"

export const resolvers: Resolvers<Context> = {
  Query: {
    user: async (_parent, { userId }, ctx) => {
      return await ctx.dataSources.db.user.findUnique({ where: { id: userId } }) ?? undefined
    },
  },
  User: {
    id: (user) => user.id,
    stripeCustomerId: (user) => user.stripeCustomerId,
  },
}
