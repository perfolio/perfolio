/**
 * A single day and its associated value
 *
 * This is the final datatype that is fed into recharts
 */
export type Data = {
  time: string
  value: number
}[]

export type AssetHistory = {
  [assetId: string]: {
    time: number
    quantity: number
    value: number
  }[]
}

export type Weights = {
  [time: number]: {
    [assetId: string]: number
  }
}

export type ReturnsPerAsset = {
  [time: number]: {
    [assetId: string]: number
  }
}

/**
 * Arbitrary values at a different times.
 *
 * Used to save absolute values like $ but also for weights and indices.
 */
export type ValueAtTime = {
  [time: number]: number
}

/**
 * All assets aggregated by their id and time
 *
 * Most of our calculations are loops through time. Thus aggregatinv by
 * time first is the most convenient.
 *
 */
export type AssetsOverTime = {
  [time: number]: {
    [assetId: string]: {
      value: number
      quantity: number
    }
  }
}
