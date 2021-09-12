import { v4 as uuid } from "uuid"

const perfolioIds = {
  user: "user",
  transaction: "tx",
  settings: "set",
  watchlist: "watch",
  notification: "notif",
}

/**
 * Generate ids similar to stripe
 *
 */
class IdGenerator<TPrefixes extends string> {
  private prefixes: Record<TPrefixes, string>

  /**
   * Create a new id generator with fully typed prefixes
   * @param prefixes - Relevant prefixes for your domain
   */
  constructor(prefixes: Record<TPrefixes, string>) {
    this.prefixes = prefixes
  }

  /**
   * Generate a new unique id with a defined prefix
   *
   * @returns xxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   */
  public id(prefix: TPrefixes): string {
    return [this.prefixes[prefix], uuid().replace(/-/g, "")].join("_")
  }
}

export const idGenerator = new IdGenerator(perfolioIds)
