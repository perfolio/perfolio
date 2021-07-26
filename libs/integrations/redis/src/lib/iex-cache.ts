import { env } from "@perfolio/util/env"
import { Cache } from "./cache"

export class IEXCache extends Cache {
  constructor() {
    super(env.require("REDIS_CONNECTION"))
  }
}
