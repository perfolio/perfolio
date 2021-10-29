import { ApolloServer } from "apollo-server-micro"

import { Logger } from "@perfolio/pkg/logger"
import { context } from "./context"

import { resolvers } from "./resolvers"
import fs from "fs"
import path from "path"
import { env } from "@chronark/env"

import { dataSources } from "./datasources"

export type ApolloHandlerConfig = {
  logger?: Logger
  withCache?: boolean
}

export const Server = (config?: ApolloHandlerConfig): ApolloServer => {
  const schemaPath = path.join(process.cwd(), "pkg/api/graphql/schema.gql")

  return new ApolloServer({
    typeDefs: fs.readFileSync(schemaPath, "utf-8"),
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
