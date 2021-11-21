import { createModule } from "graphql-modules"
import { resolvers } from "./resolvers"
import typeDefs from "./schema.gql"
export const exchangeModule = createModule({
  id: "exchange",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
