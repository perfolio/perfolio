import Redis from "ioredis"
import { convertTime } from "@perfolio/util/time"
import { Key, Value } from "./key"

export abstract class Cache {
  private readonly connection: string
  constructor(connection: string) {
    this.connection = connection
  }

  private connect(): Redis.Redis {
    return new Redis(this.connection)
  }

  public async set(ttl: string, ...data: { key: Key; value: Value }[]): Promise<void> {
    const redis = this.connect()

    /**
     * Usually we either have 1 value to save or a lot and I would like to avoid using
     * a pipeline for only 1 transaction.
     */
    if (data.length === 1) {
      await redis.setex(data[0].key.toString(), convertTime(ttl), JSON.stringify(data[0].value))
    } else {
      const pipeline = redis.pipeline()
      data.forEach(({ key, value }) => {
        pipeline.setex(key.toString(), convertTime(ttl), JSON.stringify(value))
      })
      await pipeline.exec()
    }

    redis.quit()
  }

  public async get<T extends Value>(key: Key): Promise<T | null> {
    const redis = this.connect()

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
