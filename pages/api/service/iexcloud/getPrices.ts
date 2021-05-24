import { NextApiRequest, NextApiResponse } from "next"
import { IEXCloud } from "services/iexcloud"
import { validateRequest } from "pkg/util"
import { Time } from "pkg/time"

/**
 * HTTP Endpoint for IEXCloud.getPrices().
 */
export default async function GetPrices(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const [message, valid] = validateRequest(req, ["symbol", "begin", "end"])
  if (!valid) {
    console.error(message)
    res.send(message)
    res.status(400)
    return
  }
  const svc = new IEXCloud()

  try {
    const { symbol, begin, end } = req.query

    const prices = await svc.getPrices({
      symbol: symbol as string,
      begin: Time.fromTimestamp(Number(begin)),
      end: Time.fromTimestamp(Number(end)),
    })
    res.json(prices)
  } catch (err) {
    console.error(err)
    res.status(500)
    res.send(err)
  } finally {
    await svc.close()
    res.end()
  }
}
