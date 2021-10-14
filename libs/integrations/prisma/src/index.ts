import { PrismaClient as BaseClient } from "@prisma/client"
import { env } from "@chronark/env"
export type { StockMap, Transaction, User, Settings, Portfolio } from "@prisma/client"
export { Currency, Role } from "@prisma/client"
/**
 * Inject the `pgbouncer=true` flag into the url.
 * This is done here because we require the url without pgbouncer for the migration
 * which takes place during the build step
 */
export class PrismaClient extends BaseClient {
  constructor() {
    const url = env.require("DATABASE_URL_POOL")

    super({ datasources: { db: { url: `${url}&pgbouncer=true` } } })
  }
}
