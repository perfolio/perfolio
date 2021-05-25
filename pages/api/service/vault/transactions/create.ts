import { NextApiRequest, NextApiResponse } from "next"
import { validateRequest } from "pkg/util"
import { withSentry } from "@sentry/nextjs"
import { Vault } from "services/vault/service"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { Prisma } from "@prisma/client"
/**
 * HTTP Endpoint for IEXCloud.getPrices().
 */
const GetPrices = async (req: NextApiRequest, res: NextApiResponse) => {
  const [message, valid] = validateRequest(req, [
    "executedAt",
    "assetId",
    "quantity",
    "value",
  ])
  if (!valid) {
    console.error(message)
    res.send(message)
    res.status(400)
    return
  }
  const svc = new Vault()

  try {
    const sess = getSession(req, res)
    const user = sess?.user
    const userId = user!["sub"]

    const newTx: Prisma.TransactionCreateInput = {
      userId: userId! as string,
      assetId: req.body.assetId! as string,
      value: req.body.value as number,
      quantity: req.body.quantity as number,
      executedAt: req.body.executedAt as number,
    } as Prisma.TransactionCreateInput
    console.log({ newTx })

    const transaction = await svc.addTransaction(newTx)
    res.json(transaction)
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
