import { Server } from "@perfolio/api/apollo"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * Return ok to preflight cors requests
   */
  if (req.method === "OPTIONS") {
    res.status(200)
    res.end()
  } else {
    /**
     * Handle graphql request
     */
    const server = Server()
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
