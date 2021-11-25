import { Logger } from "@perfolio/pkg/logger"
// import * as redis from "@upstash/redis"
import { ApolloServer } from "apollo-server-micro"
// import responseCachePlugin from "apollo-server-plugin-response-cache"

// import { KeyValueCacheSetOptions } from ".pnpm/apollo-server-caching@3.3.0/node_modules/apollo-server-caching"
import { env } from "@chronark/env"
import { application } from "./application"
import { context } from "./context"
import { dataSources } from "./datasources"

export type ServerConfig = {
  logger?: Logger
}

export const server = (config?: ServerConfig): ApolloServer => {
  return new ApolloServer({
    schema: application.createSchemaForApollo(),
    context,
    dataSources,
    logger: config?.logger,
    introspection: true,
    /**
     * Send metrics to apollo dashboard
     */
    apollo: env.get("NODE_ENV") === "production"
      ? {
        key: env.require("APOLLO_KEY"),
        graphId: env.require("APOLLO_GRAPH_ID"),
        graphVariant: env.require("APOLLO_GRAPH_VARIANT"),
      }
      : undefined,
    // plugins: [
    //   responseCachePlugin({
    //     cache: {
    //       get: async (key: string) => await (await redis.get(key)).data,
    //       set: async (
    //         key: string,
    //         value: unknown,
    //         options?: KeyValueCacheSetOptions,
    //       ) => {
    //         const v = typeof value === "string" ? value : JSON.stringify(value)
    //         options?.ttl
    //           ? await redis.setex(key, options.ttl, v)
    //           : await redis.set(key, v)
    //       },
    //       delete: async (key: string) => {
    //         await redis.del(key)
    //       },
    //     },
    //   }),
    // ],
  })
}
