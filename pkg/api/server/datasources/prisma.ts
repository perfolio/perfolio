import { DataSource } from "apollo-datasource"
import { PrismaClient } from "@perfolio/pkg/integrations/prisma"
/**
 * Wrapper around prisma to turn it into a DataSource
 */
export class Prisma extends DataSource {
  private client: PrismaClient
  constructor() {
    super()
    this.client = new PrismaClient()
  }
  public get settings() {
    return this.client.settings
  }
  public get transaction() {
    return this.client.transaction
  }
  public get user() {
    return this.client.user
  }
  public get portfolio() {
    return this.client.portfolio
  }
}
