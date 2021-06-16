import { UserClaims } from "@perfolio/tokens"
import { NextApiRequest, NextApiResponse } from "next"
export type MiddlewareContext = {
  claims: UserClaims
  req: NextApiRequest
  res: NextApiResponse
}

export type ApiHandler = (ctx: MiddlewareContext) => Promise<void>

export type Middleware = (apiHandler: ApiHandler) => ApiHandler
