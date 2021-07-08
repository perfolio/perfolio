import Redis from "ioredis"
import { env } from "@perfolio/util/env"
export class Key {
  public readonly query: string
  public readonly parameters?: Record<string, unknown>
  public readonly environment: string
  constructor(query: string, parameters?: Record<string, unknown>) {
    this.query = query
    this.parameters = parameters
    /**
     * Sometimes during development I fill the cache with "bad" data
     */
    this.environment = env.get("VERCEL_ENV") ?? env.get("NODE_ENV") ?? "development"
  }

  public toString(): string {
    return JSON.stringify({
      parameters: this.parameters,
      query: this.query,
      environment: this.environment,
    })
  }
}

type Value = Record<string, unknown> | unknown[] | null | string
export class Cache {
  private static connect(): Redis.Redis {
    const connection = process.env.REDIS_CONNECTION
    if (!connection) {
      throw new Error("REDIS_CONNECTION must be defined")
    }

    return new Redis(connection)
  }

  private static convertTime(ttl: string): number {
    const parsed = RegExp(/^(\d+)([smhd]{1})$/).exec(ttl)
    if (!parsed) {
      throw new Error(`Unable to parse ttl`)
    }

    const multiplier = parseInt(parsed[1])
    const time = parsed[2]

    const intervals: Record<string, number> = {
      s: 1,
      m: 60,
      h: 60 * 60,
      d: 60 * 60 * 24,
    }
    return intervals[time] * multiplier
  }

  public static async set(ttl: string, ...data: { key: Key; value: Value }[]): Promise<void> {
    const redis = Cache.connect()

    /**
     * Usually we either have 1 value to save or a lot and I would like to avoid using
     * a pipeline for only 1 transaction.
     */
    if (data.length === 1) {
      await redis.setex(
        data[0].key.toString(),
        this.convertTime(ttl),
        JSON.stringify(data[0].value),
      )
    } else {
      const pipeline = redis.pipeline()
      data.forEach(({ key, value }) => {
        pipeline.setex(key.toString(), this.convertTime(ttl), JSON.stringify(value))
      })
      await pipeline.exec()
    }

    redis.quit()
  }

  public static async get<T extends Value>(key: Key): Promise<T | null> {
    const redis = Cache.connect()

    try {
      const res = await redis.get(key.toString())
      if (!res) {
        return null
      }

      return JSON.parse(res) as T
    } catch (err) {
      return null
    } finally {
      redis.quit()
    }
  }
}
