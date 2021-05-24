import { Company, Price, Prisma } from "@prisma/client"
import { Time } from "@perfolio/time"
export interface Repository {
  /**
   * Close the connection after you are done.
   */
  close: () => void
  getCompany: (symbol: string) => Promise<Company>
  setCompany: (company: Company) => Promise<void>

  getPrice(symbol: string, time: Time): Promise<Price>
  getPrices(symbol: string, begin: Time, end: Time): Promise<Price[]>
  setPrices(prices: Price[]): Promise<void>
  findPricesForCompany(symbol: string): Promise<boolean>

  getSymbol(isin: string): Promise<string>

  setIsinMap(isin: Prisma.IsinCreateInput): Promise<void>
}
