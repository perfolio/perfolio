export type Price = {
  /**
   * Ticker of the company
   */
  symbol: string

  /**
   * Unix timestamp with second precision
   */
  time: number

  /**
   * The price (currently closing price)
   */
  value: number
}
