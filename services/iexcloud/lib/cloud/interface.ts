import { Time } from "pkg/time"

export interface IEXService {
  getCompany(req: GetCompanyCloudRequest): Promise<GetCompanyCloudResponse>
  getLogo(req: GetLogoCloudRequest): Promise<GetLogoCloudResponse>
}

export interface GetCompanyCloudRequest {
  /**
   * Ticker of the company.
   */
  symbol: string
}

/**
 * Resonse from the `GET /stock/{symbol}/company` endpoint.
 */
export interface GetCompanyCloudResponse {
  /**
   * Ticker of the company.
   */
  symbol: string
  /**
   * Name of the company.
   */
  companyName: string
  /**
   * Number of employees.
   */
  employees: number
  /**
   * Refers to Exchange using IEX Supported Exchanges list.
   */
  exchange: string
  /**
   * Refers to the industry the company belongs to.
   */
  industry: string
  /**
   * Website of the company.
   */
  website: string
  /**
   * Description for the company.
   */
  description: string
  /**
   * Name of the CEO of the company.
   */
  CEO: string
  /**
   * Name of the security.
   */
  securityName: string
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
  issueType?:
    | "ad"
    | "cs"
    | "cef"
    | "et"
    | "oef"
    | "ps"
    | "rt"
    | "struct"
    | "ut"
    | "wi"
    | "wt"
  /**
   * Refers to the sector the company belongs to.
   */
  sector: string
  /**
   * Primary SIC Code for the symbol (if available).
   */
  primarySicCode: number
  /**
   * An array of strings used to classify the company.
   */
  tags: string[]
  /**
   * Street address of the company if available.
   */
  address: string
  /**
   * Street address of the company if available.
   */
  address2: string
  /**
   * State of the company if available.
   */
  state: string
  /**
   * City of the company if available.
   */
  city: string
  /**
   * Zip code of the company if available.
   */
  zip: string
  /**
   * Country of the company if available.
   */
  country: string
  /**
   * Phone number of the company if available.
   */
  phone: string
}

export interface GetLogoCloudRequest {
  /**
   * Ticker of the company.
   */
  symbol: string
}

export interface GetLogoCloudResponse {
  /**
   * URL of the image.
   */
  url: string
}

export interface GetPriceCloudRequest {
  /**
   * Ticker of the company.
   */
  symbol: string
  /**
   * Date to fetch.
   */
  time: Time
}

export interface GetPriceCloudResponse {
  /**
   * Date of the closing price.
   */
  date: string
  /**
   * Actual closing price.
   */
  close: number
  /**
   * Volume traded that day.
   */
  volume: number
}
