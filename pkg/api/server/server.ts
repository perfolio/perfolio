import { ApolloServer } from "apollo-server-micro"

import { Logger } from "@perfolio/pkg/logger"
import { context } from "./context"
import typeDefs from "pkg/api/graphql/schema.gql"
import { resolvers } from "./resolvers"

import { env } from "@chronark/env"

import { dataSources } from "./datasources"

export type ApolloHandlerConfig = {
  logger?: Logger
  withCache?: boolean
}

export const Server = (config?: ApolloHandlerConfig): ApolloServer => {
  return new ApolloServer({
    typeDefs,
    dataSources,
    resolvers,
    logger: config?.logger,
    context,
    introspection: true,

    /**
     * Send metrics to apollo dashboard
     */
    apollo:
      env.get("NODE_ENV") === "production"
        ? {
            key: env.require("APOLLO_KEY"),
            graphId: env.require("APOLLO_GRAPH_ID"),
            graphVariant: env.require("APOLLO_GRAPH_VARIANT"),
          }
        : undefined,
    /**
     * Cache queries in redis
     * The cache ttl is defined in the graphql schema definition
     */
    // persistedQueries: {
    //   cache: new BaseRedisCache({
    //     client: new Redis(env.require("APOLLO_REDIS_CONNECTION")),
    //   }),
    // },
  })
}
