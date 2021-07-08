import { ApolloServer } from "apollo-server-micro"
import { Logger } from "tslog"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { resolvers } from "./resolvers"
import fs from "fs"
export type ApolloHandlerConfig = {
  logger?: Logger
}

export const ApolloHandler = (config?: ApolloHandlerConfig): NextApiHandler => {
  const server = new ApolloServer({
    typeDefs: fs.readFileSync("libs/api/apollo/src/lib/schema.graphql", "utf-8"),
    resolvers,
    logger: config?.logger,
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
