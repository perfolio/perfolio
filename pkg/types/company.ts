export type Company = {
  /**
   * Ticker of the company
   */
  ticker: string

  /**
   * Url of the logo
   */
  logo: string

  /**
   * Name of the company
   */
  name?: string

  /**
   * Refers to Exchange using IEX Supported Exchanges list
   * @see https://cloud.iexapis.com/stable/ref-data/exchanges
   */
  exchange?: string

  /**
   * Refers to the industry the company belongs to
   */
  industry?: string

  /**
   * Website of the company
   */
  website?: string

  /**
   *  	Description for the company
   */
  description?: string

  /**
   * Name of the CEO of the company
   */
  ceo?: string

  /**
   * Refers to the common issue type of the stock.
   * ad - ADR
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
   * empty - Other
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
    | "empty"

  /**
   * Refers to the sector the company belongs to.
   */
  sector?: string

  /**
   *  	Number of employees
   */
  employees?: number
  /**
   * Name of the CEO of the company
   */
  securityName?: string

  /**
   * Primary SIC Code for the ticker (if available)
   * @see https://en.wikipedia.org/wiki/Standard_Industrial_Classification
   */
  primarySicCode?: number

  /**
   * An array of strings used to classify the company.
   */
  tags?: string[]

  /**
   * Street address of the company if available
   */
  address?: string

  /**
   * Street address of the company if available
   */
  address2?: string

  /**
   * State of the company if available
   */
  state?: string

  /**
   * City of the company if available
   */
  city?: string

  /**
   * Zip code of the company if available
   */
  zip?: string

  /**
   * Country of the company if available
   */
  country?: string

  /**
   * Phone number of the company if available
   */
  phone?: string
}
