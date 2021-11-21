import { createModule } from "graphql-modules"
import { resolvers } from "./resolvers"
import typeDefs from "./schema.gql"

export const newsletterModule = createModule({
  id: "newsletter",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
