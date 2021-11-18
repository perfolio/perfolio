import { createModule } from "graphql-modules"
import typeDefs from "./schema.gql"
import { resolvers } from "./resolvers"
export const settingsModule = createModule({
  id: "settings",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
