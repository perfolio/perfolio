import { PrismaClient as BaseClient } from "@prisma/client"
import { env } from "@chronark/env"
export type { StockMap, Transaction, User, Settings, Portfolio, Currency } from "@prisma/client"

const url = (): string => {
  const username = env.require("PLANETSCALE_DB_USERNAME")
  const password = env.require("PLANETSCALE_DB_PASSWORD")
  const host = env.require("PLANETSCALE_DB_HOST")
  const db = env.require("PLANETSCALE_DB")
  return `mysql://${username}:${password}@${host}/${db}?sslaccept=strict`
}

/**
 * Inject the `pgbouncer=true` flag into the url.
 * This is done here because we require the url without pgbouncer for the migration
 * which takes place during the build step
 */
export class PrismaClient extends BaseClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: url(),
        },
      },
    })
  }
}
