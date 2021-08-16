import { NextApiHandler } from "next"
import { z } from "zod"
import crypto from "crypto"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { AuthenticationError } from "@perfolio/util/errors"
import { v4 as uuid } from "uuid"
import { JWT, seal, setCookie } from "@perfolio/auth"
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

const sha256 = (secret: string): string => {
  return crypto.createHash("sha256").update(secret).digest("hex")
}

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
    const verificationRequest = await prisma.verificationRequest.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token: sha256(otp),
        },
      },
    })

    if (!verificationRequest) {
      res.status(401)
      throw new AuthenticationError("No verification request found")
    }
    await prisma.verificationRequest
      .delete({ where: { id: verificationRequest.id } })
      .catch((err) => {
        res.status(500)
        throw new Error(`Unable to delete verification request: ${err}`)
      })

    if (verificationRequest.expires.getTime() < Date.now()) {
      res.status(401)
      throw new AuthenticationError("Verification request has expired")
    }

    if (sha256(otp) !== verificationRequest.token) {
      res.status(401)
      throw new AuthenticationError("Token mismatch")
    }

    // If we reach this point the user is authenticated and we can create tokens

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(500)
      throw new Error("No user found with that email")
    }

    const sessionToken = uuid()
    const hashedSessionToken = sha256(sessionToken)

    // Delete all existing sessions
    await prisma.session.deleteMany({ where: { user: { email } } })

    await prisma.session.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 7), // 7 days ttl
        sessionToken: hashedSessionToken,
      },
    })

    /**
     * Set the sessionToken as cookie
     */
    const sealed = await seal(sessionToken).catch((err) => {
      res.status(500)
      throw new Error(`Unable to seal cookie: ${err}`)
    })

    setCookie(res, sealed)

    const accessToken = JWT.sign(user.id, user.plan)

    res.json({ accessToken })
  } catch (err) {
    return res.send(err)
  } finally {
    res.end()
  }
}

export default handler
