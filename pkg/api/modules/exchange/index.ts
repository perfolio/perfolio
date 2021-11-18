import { createModule } from "graphql-modules"
import typeDefs from "./schema.gql"
import { resolvers } from "./resolvers"
export const exchangeModule = createModule({
  id: "exchange",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
