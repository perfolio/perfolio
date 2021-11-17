import { ApolloServer } from "apollo-server"
import { createApplication } from "graphql-modules"
import { userModule } from "../modules/user"
import { portfolioModule } from "../modules/portfolio"
import { context } from "./context"
import { dataSources } from "./datasources"

const application = createApplication({
  modules: [userModule, portfolioModule],
})

const schema = application.createSchemaForApollo()

const server = new ApolloServer({ schema, context, dataSources })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
