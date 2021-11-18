import { createModule } from "graphql-modules"
import typeDefs from "./schema.gql"
import { resolvers } from "./resolvers"
export const userModule = createModule({
  id: "user",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
