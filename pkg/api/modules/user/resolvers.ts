import { Resolvers } from "../../generated/schema-types"
import { Context } from "../../application/context"

export const resolvers: Resolvers<Context> = {
  Query: {
    user: async (_parent, { id }, ctx) => {
      return await ctx.dataSources.db.user.findUnique({ where: { id } })
    },
  },
  User: {
    id: (user) => {
      return user.id
    },
  },
}
