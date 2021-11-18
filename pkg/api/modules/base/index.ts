import { createModule } from "graphql-modules"
import typeDefs from "./schema.gql"
import { resolvers } from "./resolvers"
export const baseModule = createModule({
  id: "base",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
