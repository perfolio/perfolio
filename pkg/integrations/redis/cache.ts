import { Time } from "@perfolio/pkg/util/time"
import * as redis from "@upstash/redis"
import { Key, Value } from "./key"

export abstract class Cache {
  constructor(opts: { url: string; token: string }) {
    redis.auth({ url: opts.url, token: opts.token })
  }

  public async set(ttl: string, ...data: { key: Key; value: Value }[]): Promise<void> {
    await Promise.all(
      data.map((d) =>
        redis.setex(d.key.toString(), Time.toSeconds(ttl), JSON.stringify(data[0]!.value)),
      ),
    )
  }

  public async get<T extends Value>(key: Key): Promise<T | null> {
    const res = await redis.get(key.toString())
    if (!res) {
      return null
    }

    if (res.error) {
      throw new Error(`Redis error: ${res.error}`)
    }
    try {
      return JSON.parse(res.data) as T
    } catch (err) {
      throw new Error(
        `Unable to unmarshal cached value, ${JSON.stringify({ key, cached: res.data })}`,
      )
    }
  }
}
