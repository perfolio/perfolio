export enum AssetType {
  Stock = "stock",
}

export type Asset = {
  /**
   * Ticker of the company
   */
  ticker: string

  assetId: string

  assetType: AssetType
}
