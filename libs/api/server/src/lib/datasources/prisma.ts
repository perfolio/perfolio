import { DataSource } from "apollo-datasource"
import { PrismaClient } from "@perfolio/integrations/prisma"
/**
 * Wrapper around prisma to turn it into a DataSource
 */
export class Prisma extends DataSource {
  private client: PrismaClient
  constructor() {
    super()
    this.client = new PrismaClient()
  }
  public get userSettings() {
    return this.client.userSettings
  }
  public get transaction() {
    return this.client.transaction
  }
  public get stockMap() {
    return this.client.stockMap
  }
  public get user() {
    return this.client.user
  }
}
