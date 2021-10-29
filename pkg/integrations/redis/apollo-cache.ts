import { env } from "@chronark/env"
import { Cache } from "./cache"
export class ApolloCache extends Cache {
  constructor() {
    super(env.require("APOLLO_REDIS_CONNECTION"))
  }
}
