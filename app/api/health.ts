import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const handler = (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ status: "ok" }))
}
export default handler
