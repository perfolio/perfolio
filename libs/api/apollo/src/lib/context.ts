import { DataSources } from "./datasources"
import { IncomingMessage } from "http"
import { AuthenticationError } from "@perfolio/util/errors"
import { Claims, JWT } from "@perfolio/feature/tokens"
export type Context = {
  dataSources: DataSources
  authenticateUser: () => Claims
}

export const context = (ctx: { req: IncomingMessage }) => {
  const authenticateUser = () => {
    try {
      const jwt = ctx.req.headers?.authorization
      if (!jwt) {
        throw new AuthenticationError("missing authorization header")
      }
      return JWT.verify(jwt)
    } catch (err) {
      throw new AuthenticationError("invalid token")
    }
  }

  return {
    ...ctx,
    authenticateUser,
  }
}
