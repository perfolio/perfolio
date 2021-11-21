import { createModule } from "graphql-modules"
import { resolvers } from "./resolvers"
import typeDefs from "./schema.gql"

export const assetsModule = createModule({
  id: "assets",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
