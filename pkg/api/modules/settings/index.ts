import { createModule } from "graphql-modules"
import { resolvers } from "./resolvers"
import typeDefs from "./schema.gql"
export const settingsModule = createModule({
  id: "settings",
  dirname: __dirname,
  typeDefs,
  resolvers,
})
