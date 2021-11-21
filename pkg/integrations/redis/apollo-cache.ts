import { env } from "@chronark/env"
import { Cache } from "./cache"
export class ApolloCache extends Cache {
  constructor() {
    super({
      url: env.require("APOLLO_REDIS_REST_URL"),
      edgeUrl: env.require("APOLLO_REDIS_EDGE_URL"),
      token: env.require("APOLLO_REDIS_REST_TOKEN"),
    })
  }
}
