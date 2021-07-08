import { ApolloHandler } from "@perfolio/api/apollo"
import { Logger } from "tslog"

export default ApolloHandler({ logger: new Logger() })

/**
 * Without this the requests will stall.
 * I have no idea why
 */
export const config = {
  api: {
    bodyParser: false,
  },
}
