import { Company } from "@prisma/client"
import { Time } from "pkg/time"
export interface IEXService {
  getCompany(req: GetCompanyRequest): Promise<GetCompanyResponse>
  getPrice(req: GetPriceRequest): Promise<GetPriceResponse>
  getPrices(req: GetPricesRequest): Promise<GetPricesResponse>
  getSymbol(req: GetSymbolRequest): Promise<GetSymbolResponse>
  getCurrentValue(req: GetCurrentValueRequest): Promise<GetCurrentValueResponse>
}

export type GetCompanyRequest = {
  symbol: string
}
export type GetCompanyResponse = {
  company: Company
}

export type GetPriceRequest = {
  symbol: string
  time: Time
}
export type GetPriceResponse = {
  value: number
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
  // Key is a unix timestamp with nanosecond precision
  // Value is the actual price
  prices: Map<number, number>
}
