import { Magic } from "@magic-sdk/admin"
import { removeCookie } from "@perfolio/integrations/cookies"
import { env } from "@perfolio/util/env"
import { getSession, TOKEN_NAME } from "@perfolio/auth"
import { NextApiRequest, NextApiResponse } from "next"

const magic = new Magic(env.require("MAGIC_SIGNING_KEY"))

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession(req)

    if (session?.issuer) {
      await magic.users.logoutByIssuer(session.issuer)
      removeCookie(res, TOKEN_NAME)
    }
  } catch (error) {
    console.error(error)
  }

  res.writeHead(302, { Location: "/" })
  res.end()
}
