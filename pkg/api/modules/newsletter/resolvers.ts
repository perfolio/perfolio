import { Context } from "../../context"
import { Resolvers } from "../../generated/schema-types"

export const resolvers: Resolvers<Context> = {
  Mutation: {
    subscribeToNewsletter: async (_root, { email }, ctx) => {
      await ctx.dataSources.db.newsletter.upsert({
        where: { email },
        update: {},
        create: { email },
      })
      return true
    },
  },
}
