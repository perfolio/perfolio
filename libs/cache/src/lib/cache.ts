import Redis from "ioredis"

export class Cache {
  private static connect(): Redis.Redis {
    const connection = process.env.REDIS_CONNECTION
    if (!connection) {
      throw new Error("REDIS_CONNECTION must be defined")
    }

    return new Redis(connection)
  }

  public static async set(key: Redis.KeyType, value: Record<string, unknown>): Promise<void> {
    const redis = Cache.connect()

    await redis.set(key, JSON.stringify(value))

    redis.quit()
  }

  public static async get<T>(key: Redis.KeyType): Promise<T | null> {
    const redis = Cache.connect()

    try {
      const res = await redis.get(key)
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