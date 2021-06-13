import { NextApiRequest, NextApiResponse } from "next"
import { MiddlewareContext, ApiHandler } from "./types"
import { JWT } from "@perfolio/auth"
export function withAuthentication(handler: ApiHandler): ApiHandler {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    ctx: MiddlewareContext,
  ): Promise<void> => {
    const jwt = req.headers.authorization
    if (!jwt) {
      res.status(401)
      res.end("Not authorized: Authorization header missing")
      return
    }

    /**
     * Validate token
     */
    try {
      ctx.claims = JWT.verify(jwt)
      return handler(req, res, ctx)
    } catch (err) {
      res.status(401)
      res.end(`Unauthorized: ${err}`)
      return
    }
  }
}
