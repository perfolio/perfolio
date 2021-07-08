import { ApolloServer } from "apollo-server-micro"
import { BaseRedisCache } from "apollo-server-cache-redis"
import Redis from "ioredis"
import { Logger } from "tslog"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { resolvers } from "./resolvers"
import fs from "fs"
import path from "path"
import { env } from "@perfolio/util/env"
export type ApolloHandlerConfig = {
  logger?: Logger
  withCache?: boolean
}

export const ApolloHandler = (config?: ApolloHandlerConfig): NextApiHandler => {
  const schemaPath = path.join(process.cwd(), "libs/api/apollo/src/lib/schema.graphql")
  console.log({ schemaPath })
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(schemaPath, "utf-8"),
    resolvers,
    logger: config?.logger,
    persistedQueries: config?.withCache
      ? {
          cache: new BaseRedisCache({
            client: new Redis(env.require("NX_APOLLO_REDIS")),
          }),
        }
      : undefined,
  })

  const handler = server.createHandler({ path: "/graphql" })

  return async (req: NextApiRequest, res: NextApiResponse) => {
    /**
     * Set cors headers
     */
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.setHeader("Access-Control-Allow-Methods", ["GET", "POST", "OPTIONS"])
    res.setHeader("Access-Control-Allow-Credentials", "true")
    /**
     * Return ok to preflight cors requests
     */
    if (req.method === "OPTIONS") {
      return res.end()
    }

    /**
     * Handle graphql request
     */
    await handler(req, res)
    return res.end()
  }
}
