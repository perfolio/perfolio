import { env } from "@chronark/env"
import { Claims, JWT } from "@perfolio/pkg/auth"
import { ApolloCache, Key, Value } from "@perfolio/pkg/integrations/redis"
import { Logger } from "@perfolio/pkg/logger"
import { AuthenticationError, AuthorizationError } from "@perfolio/pkg/util/errors"
import { createHash } from "crypto"
import { IncomingMessage } from "http"
import { z } from "zod"
import { Permission, permissionsValidation } from "../auth/permissions"
import { DataSources } from "./datasources"

type UserType = { claims?: Claims; root: boolean }
export type Context = {
  dataSources: DataSources
  authenticateUser: () => Promise<UserType>
  authorizeUser: (
    requiredPermissions: z.infer<typeof permissionsValidation>,
    authorizer?: (claims: Claims) => void | Promise<void>,
  ) => Promise<Claims>
  logger: Logger
  cache: {
    key: (
      ...parameters: (
        | Record<string, number | string | boolean | unknown | undefined>
        | string
        | undefined
        | number
      )[]
    ) => Key
    get: <T extends Value>(key: Key) => Promise<T | null>
    set: (ttl: string, ...data: { key: Key; value: Value }[]) => Promise<void>
  }
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
        claims = JWT.verify(token.replace("Bearer ", ""))
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

  const authorizeUser = async (
    requiredPermissions: Permission[],
    authorize?: (claims: Claims) => Promise<void>,
  ): Promise<Claims> => {
    const { claims, root } = await authenticateUser()
    if (root) {
      return { sub: "__ROOT__" } as Claims
    }
    if (!claims) {
      throw new AuthorizationError("No claims found")
    }

    for (const requiredPermission of requiredPermissions) {
      if (!claims.permissions.includes(requiredPermission)) {
        throw new AuthorizationError(
          `You do not have sufficient permissions, you require ${requiredPermission}`,
        )
      }
    }
    if (authorize) {
      try {
        await authorize(claims)
      } catch (err) {
        if (err instanceof AuthorizationError) {
          throw err
        }
        throw new AuthorizationError(
          `Unauthorized: ${(err as Error).message} - ${JSON.stringify(claims)}`,
        )
      }
    }
    return claims
  }

  const cache = new ApolloCache()

  return {
    ...ctx,
    authenticateUser,
    authorizeUser,
    logger,
    cache: {
      key: (
        ...parameters: (
          | Record<string, number | string | boolean | unknown | undefined>
          | string
          | undefined
          | number
        )[]
      ) => new Key(...parameters),
      get: cache.get,
      set: cache.set,
    },
  }
}
