import { NextApiRequest, NextApiResponse } from "next"
import { MiddlewareContext, ApiHandler } from "./types"

export function withPreflightChecks(handler: ApiHandler): ApiHandler {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    ctx: MiddlewareContext,
  ): Promise<void> => {
    /**
     * For simplicity all request will be POST.
     */
    if (req.method?.toLowerCase() !== "post") {
      res.status(405)
      res.end("This endpoint only accepts post requests")
      return
    }
    /**
     * If content-type is not application/json the request body would be a string.
     * This way we do not have to unmarshal it ourselves because next has already done it.
     */
    if (req.headers["content-type"] !== "application/json") {
      res.status(400)
      res.end("Content type must be application/json")
      return
    }

    return handler(req, res, ctx)
  }
}
