import { setSession } from "@perfolio/auth"
import { Magic } from "@magic-sdk/admin"
import { env } from "@perfolio/util/env"
import {
  NextApiRequest,
  NextApiResponse,
} from ".pnpm/next@10.0.0_19437c2f9b137c4ee9c416360487a7aa/node_modules/next/dist/next-server/lib/utils"

export const magic = new Magic(env.require("MAGIC_SECRET_KEY"))

export default async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      throw new Error("No authorization header")
    }
    if (!authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Token malformed")
    }

    const didToken = authorizationHeader.substr(7)
    const metadata = await magic.users.getMetadataByToken(didToken)
    await setSession(res, metadata)

    res.status(200).send({ done: true })
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
}
