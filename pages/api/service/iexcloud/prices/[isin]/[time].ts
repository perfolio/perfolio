import { NextApiRequest, NextApiResponse } from "next"
import { IEXCloud } from "services/iexcloud"
import { Time } from "pkg/time"
export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"])
    res.status(405)
    return
  }

  const iex = new IEXCloud()
  try {
    const isin = req.query["isin"] as string
    const time = Number(req.query["time"] as string)
    if (!isin || isin === "") {
      throw new Error("No isin found")
    }
    if (!time) {
      throw new Error("No time found")
    }

    const { symbol } = await iex.getSymbol({ isin })
    const { value } = await iex.getPrice({
      symbol,
      time: Time.fromTimestamp(time),
    })
    res.json({ value })
    res.end()
  } catch (err) {
    console.error(err)
    res.status(500).end(err)
  } finally {
    await iex.close()
  }
}
