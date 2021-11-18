import { ApolloServer, } from "apollo-server-micro"

import { Logger, } from "@perfolio/pkg/logger"

import { env, } from "@chronark/env"
import { application, } from "./application"
import { context, } from "./context"
import { dataSources, } from "./datasources"

export type ServerConfig = {
  logger?: Logger
}

export const Server = (config?: ServerConfig,): ApolloServer => {
  return new ApolloServer({
    schema: application.createSchemaForApollo(),
    context,
    dataSources,
    logger: config?.logger,
    introspection: true,
    /**
     * Send metrics to apollo dashboard
     */
    apollo: env.get("NODE_ENV",) === "production"
      ? {
        key: env.require("APOLLO_KEY",),
        graphId: env.require("APOLLO_GRAPH_ID",),
        graphVariant: env.require("APOLLO_GRAPH_VARIANT",),
      }
      : undefined,
  },)
}
