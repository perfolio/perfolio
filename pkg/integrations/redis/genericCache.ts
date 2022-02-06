import { env } from "@chronark/env"
import { Cache } from "./cache"
export class GenericCache extends Cache {
  constructor() {
    super({
      url: env.require("REDIS_REST_URL"),
      token: env.require("REDIS_REST_TOKEN"),
    })
  }
}
