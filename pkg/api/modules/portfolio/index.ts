import { createModule } from "graphql-modules"
import typeDefs from "./schema.gql"
import { resolvers } from "./resolvers"

export const portfolioModule = createModule({
  id: "portfolio",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
