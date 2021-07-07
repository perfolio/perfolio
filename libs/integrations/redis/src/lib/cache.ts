import Redis from "ioredis"

export class Key {
  public readonly query: string
  public readonly parameters?: Record<string, unknown>
  constructor(query: string, parameters?: Record<string, unknown>) {
    this.query = query
    this.parameters = parameters
  }

  public toString(): string {
    return JSON.stringify({
      parameters: this.parameters,
      query: this.query,
    })
  }
}

export class Cache {
  private static connect(): Redis.Redis {
    const connection = process.env.REDIS_CONNECTION
    if (!connection) {
      throw new Error("REDIS_CONNECTION must be defined")
    }

    return new Redis(connection)
  }

  /**
   *
   * @param key
   * @param value
   * @param ttl in seconds
   */
  public static async set(
    key: Key,
    value: Record<string, unknown> | unknown[] | null,
    ttl: number,
  ): Promise<void> {
    const redis = Cache.connect()

    await redis.setex(key.toString(), ttl, JSON.stringify(value))

    redis.quit()
  }

  public static async get<T>(key: Key): Promise<T | null> {
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
