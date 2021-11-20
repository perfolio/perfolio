import { PrismaClient } from "@prisma/client"
import { DataSource } from "apollo-datasource"
/**
 * Wrapper around prisma to turn it into a DataSource
 */
export class DB extends DataSource {
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
  public get exchangeTradedAsset() {
    return this.client.exchangeTradedAsset
  }
}
