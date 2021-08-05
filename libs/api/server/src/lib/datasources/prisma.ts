import { DataSource } from "apollo-datasource"
import { CreateTransaction, CreateUserSettings, UpdateUserSettings } from "@perfolio/api/graphql"
import {
  Currency,
  PrismaClient,
  StockMap as StockMapModel,
  Transaction as TransactionModel,
  UserSettings as UserSettingsModel,
} from "@perfolio/integrations/prisma"

export class Prisma extends DataSource {
  private client: PrismaClient
  constructor() {
    super()
    this.client = new PrismaClient()
  }
  public async createTransaction(tx: CreateTransaction): Promise<TransactionModel> {
    return await this.client.transaction.create({
      data: tx,
    })
  }
  public async createUserSettings(settings: CreateUserSettings): Promise<UserSettingsModel> {
    return await this.client.userSettings.create({
      data: {
        ...settings,
        defaultCurrency: settings.defaultCurrency as Currency,
      },
    })
  }
  public async updateUserSettings(settings: UpdateUserSettings): Promise<UserSettingsModel> {
    return await this.client.userSettings.update({
      where: { userId: settings.userId },
      data: {
        defaultCurrency: (settings.defaultCurrency as Currency) ?? undefined,
        defaultExchange: settings.defaultExchange ?? undefined,
      },
    })
  }

  public async getUserSettings(userId: string): Promise<UserSettingsModel | null> {
    return await this.client.userSettings.findUnique({ where: { userId } })
  }

  public async getTransaction(transactionId: string): Promise<TransactionModel | null> {
    return await this.client.transaction.findUnique({ where: { id: transactionId } })
  }
  public async getTransactions(userId: string): Promise<TransactionModel[]> {
    return await this.client.transaction.findMany({ where: { userId } })
  }
  public async deleteTransaction(transactionId: string): Promise<void> {
    await this.client.transaction.delete({ where: { id: transactionId } })
  }
  public async getIsinMap(): Promise<StockMapModel[]> {
    return await this.client.stockMap.findMany()
  }
  public async updateIsinMap(isinMap: StockMapModel): Promise<StockMapModel> {
    return await this.client.stockMap.upsert({
      where: { ticker: isinMap.ticker },
      create: { ...isinMap },
      update: { ...isinMap },
    })
  }
}
