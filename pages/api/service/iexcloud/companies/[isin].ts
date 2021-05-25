import { NextApiRequest, NextApiResponse } from "next"
import { IEXCloud } from "services/iexcloud"

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
    if (!isin || isin === "") {
      throw new Error("No isin found")
    }

    const { symbol } = await iex.getSymbol({ isin })
    const { company } = await iex.getCompany({ symbol })
    res.json(company)
    res.end()
  } catch (err) {
    console.error(err)
    res.status(500).end(err)
  } finally {
    await iex.close()
  }
}
