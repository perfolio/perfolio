import { createModule } from "graphql-modules"
import typeDefs from "./schema.gql"
import { resolvers } from "./resolvers"
export const utilModule = createModule({
  id: "util",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
