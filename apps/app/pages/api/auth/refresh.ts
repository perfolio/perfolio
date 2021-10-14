import { NextApiHandler } from "next"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { JWT } from "@perfolio/auth"
import { Logger } from "@perfolio/logger"
import { HttpError } from "@perfolio/util/errors"
import { requireSession } from "@clerk/nextjs/api"
/**
 * Retrieve the session id from cookies and create a new session and access token
 */

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405)
    res.setHeader("Allow", "POST")
    return res.end()
  }
  const logger = new Logger({ name: "api/auth/refresh" })

  const prisma = new PrismaClient()
  try {
    const clerkId = (req as unknown as { session: { userId: string } }).session.userId

    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    })
    if (!user) {
      throw new HttpError(500, `No user found`)
    }

    const accessToken = JWT.sign(user.id, "PRO")
    res.json({ accessToken })
  } catch (err) {
    logger.error("Fatal error", err)
    res.status(err instanceof HttpError ? err.status : 500)
    return res.send(err)
  } finally {
    res.end()
  }
}

export default requireSession(handler)
