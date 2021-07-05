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
  name: string | null

  /**
   * Refers to Exchange using IEX Supported Exchanges list
   * @see https://cloud.iexapis.com/stable/ref-data/exchanges
   */
  exchange: string | null

  /**
   * Refers to the industry the company belongs to
   */
  industry: string | null

  /**
   * Website of the company
   */
  website: string | null

  /**
   *  	Description for the company
   */
  description: string | null

  /**
   * Name of the CEO of the company
   */
  ceo: string | null

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
  issueType:
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
    | null

  /**
   * Refers to the sector the company belongs to.
   */
  sector: string | null

  /**
   *  	Number of employees
   */
  employees: number | null
  /**
   * Name of the CEO of the company
   */
  securityName: string | null

  /**
   * Primary SIC Code for the ticker (if available)
   * @see https://en.wikipedia.org/wiki/Standard_Industrial_Classification
   */
  primarySicCode: number | null

  /**
   * An array of strings used to classify the company.
   */
  tags: string[] | null

  /**
   * Street address of the company if available
   */
  address: string | null

  /**
   * Street address of the company if available
   */
  address2: string | null

  /**
   * State of the company if available
   */
  state: string | null

  /**
   * City of the company if available
   */
  city: string | null

  /**
   * Zip code of the company if available
   */
  zip: string | null

  /**
   * Country of the company if available
   */
  country: string | null

  /**
   * Phone number of the company if available
   */
  phone: string | null
}
