import { NextApiHandler } from "next"
import crypto from "crypto"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { AuthenticationError } from "@perfolio/util/errors"
import { v4 as uuid } from "uuid"
import { JWT, setCookie, getCookie, unseal, seal } from "@perfolio/auth"
import { Time } from "@perfolio/util/time"
import { Logger } from "tslog"
/**
 * Retrieve the session id from cookies and create a new session and access token
 */

const sha256 = (secret: string): string => {
  return crypto.createHash("sha256").update(secret).digest("hex")
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405)
    res.setHeader("Allow", "GET")
    return res.end()
  }
  const logger = new Logger()
  try {
    const { sessionToken } = await unseal(getCookie(req)).catch((err) => {
      res.status(500)
      throw new Error(`Unable to unseal cookie: ${err}`)
    })
    logger.debug({ sessionToken })

    const hashedSessionToken = sha256(sessionToken)
    const prisma = new PrismaClient()
    // Delete all existing sessions
    const session = await prisma.session.findUnique({
      where: { sessionToken: hashedSessionToken },
      include: { user: true },
    })

    if (!session) {
      res.status(401)
      throw new AuthenticationError("No active session")
    }

    if (session.expires.getTime() < Date.now()) {
      res.status(401)
      throw new AuthenticationError("Session expired")
    }

    // Create a new session and new tokens
    const newSessionToken = uuid()

    await prisma.session.update({
      where: { id: session.id },
      data: {
        sessionToken: sha256(newSessionToken),
        expires: new Date(Date.now() + Time.toSeconds("7d", { ms: true })),
      },
    })

    const sealed = await seal(newSessionToken).catch((err) => {
      res.status(500)
      throw new Error(`Unable to seal cookie: ${err}`)
    })

    setCookie(res, sealed)

    const accessToken = JWT.sign(session.user.id, session.user.plan)

    res.json({ accessToken })
  } catch (err) {
    return res.send(err)
  } finally {
    res.end()
  }
}

export default handler
