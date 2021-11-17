import { createModule } from "graphql-modules"
import typeDefs from "./schema.gql"
import { resolvers } from "./resolvers"
export const userModule = createModule({
  id: "userModule",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
