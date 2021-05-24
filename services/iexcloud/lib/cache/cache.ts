import { PrismaClient, Company, Price, Prisma, Isin } from "@prisma/client"
import { Repository } from "./interface"
import { Time } from "pkg/time"

/**
 * Caches all iex data to reduce cost.
 */
export class Cache implements Repository {
  private db: PrismaClient

  constructor() {
    this.db = new PrismaClient({ log: [] })
  }

  public async close(): Promise<void> {
    await this.db.$disconnect()
  }
  private escalate(err: Prisma.PrismaClientKnownRequestError): Error {
    if (err.code) {
      return new Error(
        `Database error [${err.code}], visit https://www.prisma.io/docs/reference/api-reference/error-reference for more information.`,
      )
    }
    return err
  }

  public async getCompany(symbol: string): Promise<Company> {
    symbol = symbol.toLowerCase()
    let company: Company
    try {
      company = await this.db.company.findFirst({
        where: { symbol: symbol },
      })
    } catch (err) {
      throw this.escalate(err)
    }
    return company
  }
  public async setCompany(company: Prisma.CompanyCreateInput): Promise<void> {
    company.symbol = company.symbol.toLowerCase()
    try {
      await this.db.company.upsert({
        where: { symbol: company.symbol },
        update: company,
        create: company,
      })
    } catch (err) {
      throw this.escalate(err)
    }
  }

  public async findPricesForCompany(symbol: string): Promise<boolean> {
    symbol = symbol.toLowerCase()
    try {
      const prices = await this.db.price.findMany({
        where: { symbol },
      })
      return prices.length !== 0
    } catch (err) {
      throw this.escalate(err)
    }
  }

  public async getPrice(symbol: string, time: Time): Promise<Price> {
    symbol = symbol.toLowerCase()
    let price: Price
    try {
      price = await this.db.price.findFirst({
        where: { symbol, time: time.toDate() },
      })
    } catch (err) {
      throw this.escalate(err)
    }
    return price
  }

  public async getPrices(
    symbol: string,
    begin: Time,
    end: Time,
  ): Promise<Price[]> {
    symbol = symbol.toLowerCase()
    let prices: Price[]
    try {
      prices = await this.db.price.findMany({
        where: {
          AND: {
            symbol: {
              equals: symbol,
            },
            time: {
              gte: begin.toDate(),
              lte: end.toDate(),
            },
          },
        },
      })
    } catch (err) {
      throw this.escalate(err)
    }
    return prices
  }
  private async setPrice(price: Prisma.PriceCreateInput): Promise<void> {
    price.symbol = price.symbol.toLowerCase()
    try {
      const savedPrice = await this.db.price.findFirst({
        where: { time: price.time, symbol: price.symbol },
      })

      if (savedPrice) {
        await this.db.price.update({
          where: { id: savedPrice.id },
          data: price,
        })
      } else {
        await this.db.price.create({ data: price })
      }
    } catch (err) {
      throw this.escalate(err)
    }
    return
  }
  /**
   * Bulk insert prices in a single transaction.
   * If uniqueness constraints are violated this falls back to upserting every price separately.
   *
   * @param prices
   */
  public async setPrices(prices: Prisma.PriceCreateInput[]): Promise<void> {
    prices = prices.map((price) => {
      return {
        ...price,
        symbol: price.symbol.toLowerCase(),
      }
    })
    try {
      await this.db.price.createMany({
        data: prices,
        skipDuplicates: false,
      })
    } catch (err) {
      for (const price of prices) {
        try {
          await this.setPrice(price)
        } catch (err) {
          throw this.escalate(err)
        }
      }
    }
  }
  /**
   * Return the corresponding symbol for an isin.
   */
  public async getSymbol(isin: string): Promise<string> {
    let map: Isin
    try {
      map = await this.db.isin.findUnique({
        where: { isin },
      })
      return map?.symbol || null
    } catch (err) {
      throw this.escalate(err)
    }
  }
  public async setIsinMap(isin: Prisma.IsinCreateInput): Promise<void> {
    try {
      await this.db.isin.upsert({
        where: { isin: isin.isin },
        update: isin,
        create: isin,
      })
    } catch (err) {
      throw this.escalate(err)
    }
  }
}
