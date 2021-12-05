import { env } from "@chronark/env"
import * as redis from "@upstash/redis"
import { KeyValueCache } from "apollo-server-caching"

export class RedisCache implements KeyValueCache<string> {
  constructor() {
    redis.auth({
      url: env.require("APOLLO_REDIS_REST_URL"),
      edgeUrl: env.require("APOLLO_REDIS_EDGE_URL"),
      token: env.require("APOLLO_REDIS_REST_TOKEN"),
      readFromEdge: true,
    })
  }

  async get(key: string): Promise<string | undefined> {
    const res = await redis.get(key)
    return res.data ?? undefined
  }
  async set(key: string, value: string, options?: { ttl?: number }): Promise<void> {
    typeof options?.ttl === "number"
      ? await redis.setex(key, options.ttl, value)
      : await redis.set(key, value)
  }
  async delete(key: string): Promise<void> {
    await redis.del(key)
  }
}
