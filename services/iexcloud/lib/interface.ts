import { Company } from "@prisma/client"
import { Time } from "pkg/time"
export interface IEXService {
  getCompany(req: GetCompanyRequest): Promise<GetCompanyResponse>
  getPrices(req: GetPricesRequest): Promise<GetPricesResponse>
}

export type GetCompanyRequest = {
  symbol: string
}
export type GetCompanyResponse = {
  company: Company
}

export type GetSymbolRequest = {
  isin: string
}
export type GetSymbolResponse = {
  symbol: string
}
export type GetCurrentValueRequest = {
  symbol: string
}
export type GetCurrentValueResponse = {
  value: number
}

export type GetPricesRequest = {
  symbol: string
  begin: Time
  end: Time
}
export type GetPricesResponse = {
  // Key is a unix timestamp with second precision
  // Value is the actual price
  prices: Record<number, number>
}

export type GetPriceRequest = {
  symbol: string
  time: Time
}
export type GetPriceResponse = {
  symbol: string
  time: Time
  value: number
}
