import { NextApiHandler } from "next"
import { z } from "zod"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { AuthenticationError } from "@perfolio/util/errors"
import { Auth, SessionCookie } from "@perfolio/auth"
import { env } from "@perfolio/util/env"
import { Logger } from "tslog"
/**
 * This lambda receives the email and the token entered by the user and verifies them.
 *
 * Afterwards a new session is created and a refresh token set as httponly cookie
 * and a JWT access token sent to the frontend.
 */

const validation = z.object({
  email: z.string().email(),
  token: z.string().uuid(),
})

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405)
    res.setHeader("Allow", "POST")
    return res.end()
  }
  const logger = new Logger({ name: "api/auth/admin" })
  try {
    const { email, token } = await validation.parseAsync(JSON.parse(req.body)).catch((err) => {
      res.status(400)
      throw err
    })

    if (token !== env.require("AUTH_ROOT_TOKEN")) {
      throw new AuthenticationError("Wrong token")
    }
    const prisma = new PrismaClient()
    const auth = new Auth(prisma)
    const cookie = new SessionCookie(req, res)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error(`No user found`)
    }

    await prisma.user.update({
      where: { email },
      data: {
        lastLogin: new Date(),
      },
    })

    // If we reach this point the user is authenticated and we can create tokens

    const { sessionToken } = await auth.createSession(user.id).catch((err) => {
      res.status(500)
      throw new Error(`Unable to create session: ${err}`)
    })
    /**
     * Set the sessionToken as cookie
     */
    await cookie.set(sessionToken).catch((err) => {
      res.status(500)
      throw new Error(`Unable to set session cookie: ${err}`)
    })

    res.send("ok")
  } catch (err) {
    logger.error(err)
    return res.send(err)
  } finally {
    res.end()
  }
}

export default handler
