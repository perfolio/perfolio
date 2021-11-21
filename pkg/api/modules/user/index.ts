import { createModule } from "graphql-modules"
import { resolvers } from "./resolvers"
import typeDefs from "./schema.gql"
export const userModule = createModule({
  id: "user",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
