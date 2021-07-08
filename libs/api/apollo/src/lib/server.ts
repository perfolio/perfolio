import { ApolloServer } from "apollo-server-micro"
import { BaseRedisCache } from "apollo-server-cache-redis"
import Redis from "ioredis"
import { Logger } from "tslog"

import { resolvers } from "./resolvers"
import fs from "fs"
import path from "path"
import { env } from "@perfolio/util/env"

import { dataSources } from "./datasources"

export type ApolloHandlerConfig = {
  logger?: Logger
  withCache?: boolean
}

export const Server = (config?: ApolloHandlerConfig): ApolloServer => {
  const schemaPath = path.join(process.cwd(), "libs/api/graphql/src/lib/schema.gql")
  return new ApolloServer({
    typeDefs: fs.readFileSync(schemaPath, "utf-8"),
    resolvers,
    dataSources,
    logger: config?.logger,

    /**
     * Send metrics to apollo dashboard
     */
    apollo: {
      key: env.require("NX_APOLLO_KEY"),
      graphId: env.require("NX_APOLLO_GRAPH_ID"),
      graphVariant: env.require("NX_APOLLO_GRAPH_VARIANT"),
    },
    // persistedQueries: {
    //   cache: new BaseRedisCache({
    //     client: new Redis(env.require("NX_APOLLO_REDIS")),
    //   }),
    // },
  })

  
}
