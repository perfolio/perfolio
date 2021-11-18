import { env, } from "@chronark/env"
import { Server, } from "@perfolio/pkg/api/server"
import { JWT, } from "@perfolio/pkg/auth"
import { NextApiRequest, NextApiResponse, } from "next"

JWT.init(`https://${env.require("NEXT_PUBLIC_AUTH0_DOMAIN",)}/.well-known/jwks.json`, {
  audience: env.require("NEXT_PUBLIC_AUTH0_AUDIENCE",),
  issuer: env.require("NEXT_PUBLIC_AUTH0_ISSUER",),
},)

export default async function handler(req: NextApiRequest, res: NextApiResponse,) {
  /**
   * Return ok to preflight cors requests
   */
  if (req.method === "OPTIONS") {
    res.status(200,)
    return res.end()
  }

  const server = Server()
  await server.start()
  /**
   * Handle graphql request
   */
  const handler = server.createHandler({ path: "/api/graphql", },)
  await handler(req, res,)
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
