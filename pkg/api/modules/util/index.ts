import { createModule } from "graphql-modules"
import { resolvers } from "./resolvers"
import typeDefs from "./schema.gql"
export const utilModule = createModule({
  id: "util",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
