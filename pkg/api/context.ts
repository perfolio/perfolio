import { env } from "@chronark/env"
import { Claims, JWT } from "@perfolio/pkg/auth"
import { Logger } from "@perfolio/pkg/logger"
import { AuthenticationError, AuthorizationError } from "@perfolio/pkg/util/errors"
import { createHash } from "crypto"
import { IncomingMessage } from "http"
import { DataSources } from "./datasources"

type UserType = { claims?: Claims; root: boolean }
export type Context = {
  dataSources: DataSources
  authenticateUser: () => Promise<UserType>
  authorizeUser: (authorizer: (claims: Claims) => boolean) => Promise<void>
  logger: Logger
}

export const context = (ctx: { req: IncomingMessage }) => {
  const logger = new Logger()
  const authenticateUser = async (): Promise<UserType> => {
    const token = ctx.req.headers?.authorization
    if (!token) {
      throw new AuthenticationError("missing authorization header")
    }
    if (token.startsWith("Bearer ")) {
      let claims: Claims
      try {
        const jwt = JWT.getInstance()
        claims = await jwt.verify(token.replace("Bearer ", ""))
      } catch (err) {
        logger.error((err as Error).message)
        throw new AuthenticationError("Unable to verify token")
      }
      return { claims, root: false }
    }
    if (createHash("sha256").update(token).digest("hex") === env.require("ROOT_TOKEN_HASH")) {
      return { root: true }
    }
    throw new AuthenticationError("Invalid token")
  }

  const authorizeUser = async (authorize: (claims: Claims) => Promise<void>): Promise<void> => {
    const { claims, root } = await authenticateUser()
    if (root) {
      return
    }
    if (!claims) {
      throw new AuthorizationError("No claims found")
    }
    if (!authorize(claims)) {
      logger.warn("claims", { claims })
      throw new AuthorizationError("UserId does not match")
    }
  }

  return {
    ...ctx,
    authenticateUser,
    authorizeUser,
    logger,
  }
}
