import { MiddlewareContext, use, withCors } from "@perfolio/middleware"
import { JWT } from "@perfolio/tokens"
import { getSession } from "next-auth/client"
import { db } from "@perfolio/db"
async function refresh(_: void, { req }: MiddlewareContext): Promise<{ accessToken: string }> {
  const secret = process.env.NX_JWT_SIGNING_KEY
  if (!secret) {
    throw new Error("NX_JWT_SIGNING_KEY must be defined")
  }

  const session = await getSession({ req })
  if (!session) {
    throw new Error(`No session found`)
  }
  if (!session.user?.email) {
    throw new Error(`No email found in session`)
  }
  const user = await db().user.fromEmail(session.user?.email)
  if (!user) {
    throw new Error(`No user found`)
  }

  const accessToken = JWT.sign({ userId: user.id })

  return { accessToken }
}

export default use(refresh, [withCors()])
