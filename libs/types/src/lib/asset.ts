export enum AssetType {
  Stock = "stock",
}

export type Asset = {
  /**
   * Ticker of the company
   */
  symbol: string

  assetId: string

  assetType: AssetType
}
