import { buildIndex, } from "./buildIndex"
import { calculateReturnsPerAsset, } from "./returnsPerAsset"
import { calculateTotalReturns, } from "./totalReturns"
import { AssetsOverTime, ValueAtTime, } from "./types"
import { calculateWeight, } from "./weights"

export const rebalance = (assetsOvertime: AssetsOverTime,): ValueAtTime => {
  const weights = calculateWeight(assetsOvertime,)
  const returns = calculateReturnsPerAsset(assetsOvertime,)
  const totalReturns = calculateTotalReturns(weights, returns,)
  return buildIndex(totalReturns,)
}
