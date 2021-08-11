import { Server } from "@perfolio/api/server"
import { JWT } from "@perfolio/feature/tokens"
import { NextApiRequest, NextApiResponse } from "next"
import { env } from "@perfolio/util/env"
/**
 * Vercel purges this automatially so we have to explicitely import it.
 * I have no idea what it is even for but the lambda will error out if it's not
 * loaded.
 */
import "ts-tiny-invariant"

/**
 * Initialize a JWT singleton here to cache the JWKS data while the lambda remains hot.
 * Without caching we are calling the jwks endpoint for every request, adding ~ 600ms of latency
 */
JWT.init(`https://${env.require("AUTH0_DOMAIN")}/.well-known/jwks.json`, {
  audience: env.require("AUTH0_AUDIENCE"),
  issuer: env.require("AUTH0_ISSUER"),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Return ok to preflight cors requests
   */
  if (req.method === "OPTIONS") {
    res.status(200)
    res.end()
  } else {
    const server = Server()
    await server.start()
    /**
     * Handle graphql request
     */
    const handler = server.createHandler({ path: "/api/graphql" })
    await handler(req, res)
  }
}

/**
 * ApolloServer expects the raw body to be available to the handler,
 * and not an object parsed from JSON as it is by default for API Routes.
 * To prevent this, we need to export this config object.
 */
export const config = {
  api: {
    bodyParser: false,
  },
}
