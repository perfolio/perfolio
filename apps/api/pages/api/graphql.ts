import { Server } from "@perfolio/api/apollo"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const server = Server()
  console.log({method: req.method, req})
  /**
   * Set cors headers
   */
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  res.setHeader("Access-Control-Allow-Methods", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true")
   /**
    * Return ok to preflight cors requests
    */
   if (req.method === "OPTIONS") {
    res.status(200)
      res.end()
   return
    }  

  /**
   * Handle graphql request
   */
  const handler = server.createHandler({ path: "/api/graphql" })
  return await handler(req, res)
}

// export default ApolloHandler({ logger: new Logger() })

// /**
//  * Finally, ApolloServer expects the raw body to be available to the handler,
//  * and not an object parsed from JSON as it is by default for API Routes.
//  * To prevent this, we need to export this config object.
//  */
export const config = {
  api: {
    bodyParser: false,
  },
}
