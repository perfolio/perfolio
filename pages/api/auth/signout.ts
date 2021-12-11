import { NextApiRequest, NextApiResponse } from "next"
import { JWT, AuthCookie } from "pkg/auth"
import { Logger } from "pkg/logger"
import { Magic } from "@magic-sdk/admin"
import { env } from "@chronark/env"

export default async function signout(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405)
    res.setHeader("Allow", "POST")
    return res.end()
  }
  const logger = new Logger({ name: "api/auth/sign-out" })
  try {
    const cookie = new AuthCookie(req, res)
    const token = await cookie.getToken()
    cookie.remove()

    if (token) {
        const magic = new Magic(env.require("MAGIC_SECRET_KEY"))
      const { iss } = JWT.decode(token)

      await magic.users.logoutByIssuer(iss)
    }

    res.writeHead(302, { Location: "/" })
  } catch (err) {
    logger.error("Fatal error", { err: err as Error })
    res.status(500)
  } finally {
    res.end()
  }
}
