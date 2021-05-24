import { Company, Price, Prisma } from "@prisma/client"
import { Time } from "pkg/time"
export interface Repository {
  /**
   * Close the connection after you are done.
   */
  close: () => void
  getCompany: (symbol: string) => Promise<Company | null>
  setCompany: (company: Prisma.CompanyCreateInput) => Promise<Company>

  getPrice(symbol: string, time: Time): Promise<Price | null>
  getPrices(symbol: string, begin: Time, end: Time): Promise<Price[]>
  setPrice(price: Prisma.PriceCreateInput): Promise<Price>
  setPrices(prices: Prisma.PriceCreateInput[]): Promise<Price[]>
}
