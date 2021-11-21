import { createModule } from "graphql-modules"
import { resolvers } from "./resolvers"
import typeDefs from "./schema.gql"

export const portfolioModule = createModule({
  id: "portfolio",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
