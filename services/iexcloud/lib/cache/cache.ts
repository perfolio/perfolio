import { PrismaClient, Company, Price, Prisma } from "@prisma/client"
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

  public async getCompany(symbol: string): Promise<Company | null> {
    symbol = symbol.toLowerCase()
    let company: Company | null
    try {
      company = await this.db.company.findFirst({
        where: { symbol: symbol },
      })
    } catch (err) {
      throw this.escalate(err)
    }

    return company
  }
  public async setCompany(
    company: Prisma.CompanyCreateInput,
  ): Promise<Company> {
    company.symbol = company.symbol.toLowerCase()
    return await this.db.company
      .upsert({
        where: { symbol: company.symbol },
        update: company,
        create: company,
      })
      .catch((err) => {
        throw this.escalate(err)
      })
  }

  public async getPrice(symbol: string, time: Time): Promise<Price | null> {
    symbol = symbol.toLowerCase()
    let price: Price | null
    try {
      price = await this.db.price.findFirst({
        where: { symbol, time: time.unix() },
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

    return await this.db.price
      .findMany({
        where: {
          AND: {
            symbol: {
              equals: symbol,
            },
            time: {
              gte: begin.unix(),
              lte: end.unix(),
            },
          },
        },
      })
      .catch((err) => {
        throw this.escalate(err)
      })
  }
  /**
   * Store a single price.
   *
   * This does not check if a price is already in the db.
   */
  public async setPrice(price: Prisma.PriceCreateInput): Promise<Price> {
    return this.db.price.create({ data: price }).catch((err) => {
      throw new Error(`Unable to set price: ${err}`)
    })
  }
  /**
   * Bulk insert prices in a single transaction.
   * If uniqueness constraints are violated this falls back to upserting every price separately.
   *
   * @param prices
   */
  public async setPrices(prices: Prisma.PriceCreateInput[]): Promise<Price[]> {
    return Promise.all(
      prices.map(async (price) => {
        const foundPrice = await this.db.price.findFirst({
          where: {
            AND: {
              symbol: price.symbol,
              time: price.time,
            },
          },
        })
        if (foundPrice) {
          return await this.db.price.update({
            where: {
              id: foundPrice.id,
            },
            data: price,
          })
        } else {
          return await this.db.price.create({ data: price })
        }
      }),
    )
  }
  /**
   * Return the corresponding symbol for an isin.
   */
  public async getSymbol(isin: string): Promise<string | null> {
    const map = await this.db.isin
      .findUnique({
        where: { isin },
      })
      .catch((err) => {
        throw this.escalate(err)
      })
    return map?.symbol || null
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
