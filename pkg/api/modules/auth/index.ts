import { createModule } from "graphql-modules"
import { resolvers } from "./resolvers"
import typeDefs from "./schema.gql"
export const authModule = createModule({
  id: "auth",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
