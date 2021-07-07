import { Time } from "@perfolio/util/time"
import * as z from "zod"
export interface IEXService {
  getCompany(req: GetCompanyRequest): Promise<GetCompanyResponse>
  getLogo(req: GetLogoRequest): Promise<GetLogoResponse>
  getHistory(req: GetHistoryRequest): Promise<GetHistoryResponse>
  getPossibleAssets(req: GetPossibleAssetsRequest): Promise<GetPossibleAssetsResponse>
  getTickerFromFigi(req: getTickerFromFigiRequest): Promise<getTickerFromFigiRespnse>
  getCurrentPrice(req: GetCurrentPriceRequest): Promise<GetCurrentPriceResponse>
}

export type GetCompanyRequest = {
  /**
   * Ticker of the company.
   */
  asset: string
}

export const GetCompanyResponseValidator = z.object({
  /**
   * Ticker of the company.
   */
  asset: z.string(),
  /**
   * Name of the company.
   */
  companyName: z.string(),
  /**
   * Number of employees.
   */
  employees: z.number(),
  /**
   * Refers to Exchange using IEX Supported Exchanges list.
   */
  exchange: z.string(),
  /**
   * Refers to the industry the company belongs to.
   */
  industry: z.string(),
  /**
   * Website of the company.
   */
  website: z.string().url(),
  /**
   * Description for the company.
   */
  description: z.string(),
  /**
   * Name of the CEO of the company.
   */
  CEO: z.string(),
  /**
   * Name of the security.
   */
  securityName: z.string(),
  /**
   * Refers to the common issue type of the stock.
   *
   * Ad - ADR
   * cs - Common Stock
   * cef - Closed End Fund
   * et - ETF
   * oef - Open Ended Fund
   * ps - Preferred Stock
   * rt - Right
   * struct - Structured Product
   * ut - Unit
   * wi - When Issued
   * wt - Warrant
   * empty - Other.
   */
  issueType: z.enum(["ad", "cs", "cef", "et", "oef", "ps", "rt", "struct", "ut", "wi", "wt"]),
  /**
   * Refers to the sector the company belongs to.
   */
  sector: z.string(),
  /**
   * Primary SIC Code for the asset (if available).
   */
  primarySicCode: z.number(),
  /**
   * An array of strings used to classify the company.
   */
  tags: z.array(z.string()),
  /**
   * Street address of the company if available.
   */
  address: z.string(),
  /**
   * Street address of the company if available.
   */
  address2: z.string(),
  /**
   * State of the company if available.
   */
  state: z.string(),
  /**
   * City of the company if available.
   */
  city: z.string(),
  /**
   * Zip code of the company if available.
   */
  zip: z.string(),
  /**
   * Country of the company if available.
   */
  country: z.string(),
  /**
   * Phone number of the company if available.
   */
  phone: z.string(),
})

/**
 * Resonse from the `GET /stock/{asset}/company` endpoint.
 */
export type GetCompanyResponse = z.infer<typeof GetCompanyResponseValidator>

export interface GetLogoRequest {
  /**
   * Ticker of the company.
   */
  asset: string
}

export const GetLogoResponseValidator = z.object({
  url: z.string().url(),
})
export type GetLogoResponse = z.infer<typeof GetLogoResponseValidator>
export interface GetPriceRequest {
  /**
   * Isin of the company.
   */
  isin: string
  /**
   * Date to fetch.
   */
  time: Time
}

export const GetClosingPriceResponseValidator = z.object({
  close: z.number(),
})
export type GetClosingPriceResponse = z.infer<typeof GetClosingPriceResponseValidator>

export interface GetHistoryRequest {
  /**
   * Isin of the company.
   */
  isin: string
}

export type GetHistoryResponse = {
  /**
   * Date of the closing price.
   */
  time: Time
  /**
   * Actual closing price.
   */
  value: number
}[]

export type getTickerFromFigiRequest = {
  figi: string
}

export type getTickerFromFigiRespnse = {
  ticker: string
  exchange: string
  region: string
}

export type GetCurrentPriceRequest = {
  isin: string
}

export type GetCurrentPriceResponse = {
  value: number
}

export type GetPossibleAssetsRequest = {
  isin: string
}

export type GetPossibleAssetsResponse = {
  asset: string
  region: string
  exchange: string
}[]

export type GetVolumeByVenueRequest = {
  asset: string
}
export type GetVolumeByVenueResponse = {
  /**
   * Refers to the current day, 15 minute delayed volume
   */
  volume: number
  /**
   * Refers to the Market Identifier Code (MIC)
   */
  venue: string
  /**
   * Refers to a readable version of the venue defined by IEX
   */
  venueName: string
  /**
   *  Refers to the date the data was last updated in the format YYYY-MM-DD
   */
  date: string
  /**
   * Refers to the 15 minute delayed percent of total stock volume traded by the venue
   */
  marketPercent: number
}[]
