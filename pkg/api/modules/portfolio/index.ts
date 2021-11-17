import { createModule } from "graphql-modules"
import typeDefs from "./schema.gql"
import { resolvers } from "./resolvers"

export const portfolioModule = createModule({
  id: "portfolioModule",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
