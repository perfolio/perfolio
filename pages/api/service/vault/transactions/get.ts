import { NextApiRequest, NextApiResponse } from "next"
import { withSentry } from "@sentry/nextjs"
import { Vault } from "services/vault/service"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

/**
 * HTTP Endpoint for IEXCloud.getPrices().
 */
const GetPrices = async (req: NextApiRequest, res: NextApiResponse) => {
  const svc = new Vault()

  try {
    const sess = getSession(req, res)
    const user = sess?.user
    const userId = user!["sub"]

    const transactions = await svc.getTransactions({ userId })
    res.json(transactions)
  } catch (err) {
    console.error(err)
    res.status(500)
    res.send(err)
  } finally {
    await svc.close()
    res.end()
  }
}

export default withApiAuthRequired(withSentry(GetPrices))
