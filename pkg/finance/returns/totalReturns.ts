import { ReturnsPerAsset, ValueAtTime, Weights, } from "./types"

/**
 * @webersni help :D
 */
export const calculateTotalReturns = (weights: Weights, returns: ReturnsPerAsset,): ValueAtTime => {
  const times: number[] = Object.keys(weights,).map((time,) => Number(time,))
  const totalReturns: ValueAtTime = {}
  times.forEach((time,) => {
    let total = 0
    if (!(time in weights)) {
      throw new Error(`${time} is not in weights`,)
    }
    Object.keys(weights[time]!,).forEach((assetId,) => {
      if (!(assetId in weights[time]!)) {
        throw new Error(`${assetId} is not in weights.${time}`,)
      }

      if (!(time in returns)) {
        throw new Error(`${time} is not in returns`,)
      }
      if (!(assetId in returns[time]!)) {
        throw new Error(`${assetId} is not in returns.${time}`,)
      }
      total += weights[time]![assetId]! * returns[time]![assetId]!
    },)
    totalReturns[time] = total
  },)
  return totalReturns
}
