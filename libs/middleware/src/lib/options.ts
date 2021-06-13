import { NextApiRequest, NextApiResponse } from "next"
import { MiddlewareContext, ApiHandler } from "./types"

/**
 * If an OPTIONS request comes in we simply return 200
 */
export function withOptions(handler: ApiHandler): ApiHandler {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    ctx: MiddlewareContext,
  ): Promise<void> => {
    if (req.method === "OPTIONS") {
      res.status(200).end
      return
    }

    return handler(req, res, ctx)
  }
}
