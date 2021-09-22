import { PrismaClient as BaseClient } from "@prisma/client"
export type { StockMap, Transaction, User, Settings, Portfolio } from "@prisma/client"
export { Currency, Role } from "@prisma/client"
/**
 * Inject the `pgbouncer=true` flag into the url.
 * This is done here because we require the url without pgbouncer for the migration
 * which takes place during the build step
 */
export class PrismaClient extends BaseClient {
  constructor() {
    const url = process.env["DATABASE_URL_POOL"]
    if (!url) {
      throw new Error(`DATABASE_URL_POOL is undefined`)
    }

    super({ datasources: { db: { url: `${url}&pgbouncer=true` } } })
  }
}
