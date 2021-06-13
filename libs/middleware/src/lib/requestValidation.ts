import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { MiddlewareContext, ApiHandler, Middleware } from "./types"

export function withRequestValidation(validator: z.ZodAny): Middleware {
  return (handler: ApiHandler): ApiHandler => {
    return async (
      req: NextApiRequest,
      res: NextApiResponse,
      ctx: MiddlewareContext,
    ): Promise<void> => {
      try {
        validator.parse(req.body)
        return handler(req, res, ctx)
      } catch (err) {
        res.status(400)
        res.end(`Invalid request arguments: ${err}`)
        return
      }
    }
  }
}
