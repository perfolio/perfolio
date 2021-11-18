import { createModule } from "graphql-modules"
import typeDefs from "./schema.gql"
import { resolvers } from "./resolvers"

export const assetsModule = createModule({
  id: "assets",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
