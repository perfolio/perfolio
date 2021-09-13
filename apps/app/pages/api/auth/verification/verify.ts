import { NextApiHandler } from "next"
import { z } from "zod"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { AuthenticationError } from "@perfolio/util/errors"
import { Auth, JWT, SessionCookie } from "@perfolio/auth"
import { Logger } from "@perfolio/logger"
/**
 * This lambda receives the email and the token entered by the user and verifies them.
 *
 * Afterwards a new session is created and a refresh token set as httponly cookie
 * and a JWT access token sent to the frontend.
 */

const validation = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^(\d){6}$/),
})

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405)
    res.setHeader("Allow", "POST")
    return res.end()
  }
  const logger = new Logger()
  try {
    const { email, otp } = await validation.parseAsync(req.body).catch((err) => {
      res.status(400)
      throw err
    })
    const prisma = new PrismaClient()
    const auth = new Auth(prisma)
    const cookie = new SessionCookie(req, res)
    await auth.verifyAuthenticationRequest(email, otp).catch((err) => {
      throw new AuthenticationError(`Unable to verify request: ${err}`)
    })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error(`No user found`)
    }
    if (!user.emailVerified) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      })
    }

    await prisma.login.create({
      data: {
        userId: user.id,
        time: new Date(),
      },
    })

    // If we reach this point the user is authenticated and we can create tokens

    const refreshToken = await auth.createRefreshToken(user.id).catch((err) => {
      res.status(500)
      throw new Error(`Unable to create session: ${err}`)
    })
    /**
     * Set the refreshToken as cookie
     */
    await cookie.set(refreshToken).catch((err) => {
      res.status(500)
      throw new Error(`Unable to set session cookie: ${err}`)
    })

    const accessToken = JWT.sign(user.id, "PRO")

    res.json({ accessToken })
  } catch (err) {
    logger.error(err)
    return res.send(err)
  } finally {
    res.end()
  }
}

export default handler
