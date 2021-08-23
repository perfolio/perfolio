import { NextApiHandler } from "next"
import { z } from "zod"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { AuthenticationError } from "@perfolio/util/errors"
import { Auth, JWT } from "@perfolio/auth"
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
  try {
    const { email, otp } = await validation.parseAsync(req.body).catch((err) => {
      res.status(400)
      throw err
    })
    const prisma = new PrismaClient()
    const auth = new Auth(prisma)
    await auth.verifyAuthenticationRequest(email, otp).catch((err) => {
      throw new AuthenticationError(`Unable to verify request: ${err}`)
    })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(500)
      throw new Error("No user found with that email")
    }
    // If we reach this point the user is authenticated and we can create tokens

    const { sessionToken } = await auth.createSession(user.id).catch((err) => {
      res.status(500)
      throw new Error(`Unable to create session: ${err}`)
    })
    /**
     * Set the sessionToken as cookie
     */
    await auth.setSessionCookie(res, sessionToken).catch((err) => {
      res.status(500)
      throw new Error(`Unable to set session cookie: ${err}`)
    })

    const accessToken = JWT.sign(user.id, user.plan)

    res.json({ accessToken })
  } catch (err) {
    return res.send(err)
  } finally {
    res.end()
  }
}

export default handler
