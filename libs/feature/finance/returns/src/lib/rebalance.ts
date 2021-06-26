import { buildIndex } from "./buildIndex"
import { calculateReturnsPerAsset } from "./returnsPerAsset"
import { calculateWeight } from "./weights"
import { calculateTotalReturns } from "./totalReturns"
import { AssetsOverTime, ValueAtTime } from "./types"

export const rebalance = (assetsOvertime: AssetsOverTime): ValueAtTime => {
  const weights = calculateWeight(assetsOvertime)
  const returns = calculateReturnsPerAsset(assetsOvertime)
  const totalReturns = calculateTotalReturns(weights, returns)
  return buildIndex(totalReturns)
}
