import { findIsin, FindIsinRequest, FindIsinResponse } from "@perfolio/pkg/integrations/openfigi"
import { DataSource } from "apollo-datasource"
import { GenericCache, Key } from "@perfolio/pkg/integrations/redis"

/**
 * Wrapper around prisma to turn it into a DataSource
 */
export class OpenFigi extends DataSource {
  private cache: GenericCache
  constructor() {
    super()
    this.cache = new GenericCache()
  }
  async findIsin(req: FindIsinRequest): Promise<FindIsinResponse> {
    const key = new Key(req)
    const cached = await this.cache.get<FindIsinResponse>(key)
    if (cached) {
      return cached
    }
    const value = await findIsin(req)
    await this.cache.set("1h", { key, value })
    return value
  }
}
