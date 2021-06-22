import { Claims } from "@perfolio/feature/tokens"
import { NextApiRequest, NextApiResponse } from "next"
export type MiddlewareContext = {
  claims: Claims
  req: NextApiRequest
  res: NextApiResponse
}

export type ApiHandler = (ctx: MiddlewareContext) => Promise<void>

export type Middleware = (apiHandler: ApiHandler) => ApiHandler
