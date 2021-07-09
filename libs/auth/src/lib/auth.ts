import { NextApiRequest, NextApiResponse } from "next"
import Iron from "@hapi/iron"
import { setCookie, getCookie } from "@perfolio/integrations/cookies"
import { MagicUserMetadata } from "magic-sdk"
import { env } from "@perfolio/util/env"
import { IncomingMessage } from "http"
export const MAX_AGE = 60 * 60 * 24 * 7 // 7 days
export const TOKEN_NAME = "perfolio-auth-token"

export type Session = MagicUserMetadata & {
  createdAt: Date
  maxAge: number
}

export async function setSession(res: NextApiResponse, metadata: MagicUserMetadata): Promise<void> {
  const session = {
    ...metadata,
    createdAt: Date.now(),
    maxAge: MAX_AGE,
  }
  const secret = env.require("MAGIC_SIGNING_KEY")
  const token = await Iron.seal(session, secret, Iron.defaults).catch((err) => {
    throw new Error(`Unable to seal session: ${err.message}`)
  })
  setCookie(res, TOKEN_NAME, token, MAX_AGE)
}

export async function getSession(
  req: NextApiRequest | IncomingMessage,
): Promise<Session | undefined> {
  const token = getCookie(req, TOKEN_NAME)
  if (!token) {
    return
  }
  const secret = env.require("MAGIC_SIGNING_KEY")
  const session = await Iron.unseal(token, secret, Iron.defaults).catch((err) => {
    throw new Error(`Unable to unseal session: ${err.message}`)
  })
  const expiresAt = session.createdAt + session.maxAge * 1000

  if (Date.now() > expiresAt) {
    throw new Error("Session expired")
  }
  return session
}
