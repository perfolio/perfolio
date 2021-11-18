import { AssetsOverTime, Weights, } from "./types"

/**
 * Compute weights for each asset for each day.
 *
 * If a user has $100 worth of assetA and $100 worth of assetB the weights will be 0.5 and 0.5
 */
export const calculateWeight = (timeline: AssetsOverTime,): Weights => {
  const weights: Weights = {}
  Object.entries(timeline,).forEach((day,) => {
    const time = Number(day[0],)
    const assets = day[1]
    /**
     * Compute the total value of all assets on this day.
     */
    const totalValue = Object.values(assets,)
      .map((asset,) => asset.quantity * asset.value)
      .reduce((acc, val,) => acc + val)

    if (!weights[time]) {
      weights[time] = {}
    }

    Object.entries(assets,).forEach(([assetId, { value, quantity, },],) => {
      weights[time][assetId] = (value * quantity) / totalValue
    },)
  },)
  return weights
}
