import { Mean, } from "./mean"
import { getRelativeDifferences, } from "./util"

export function average(values: number[],): number {
  return values.reduce((acc, val,) => acc + val, 0,) / values.length
}

export function standardDeviation(values: number[],): number {
  if (values.length < 2) {
    return 0
  }
  const relativeMean = Mean.getRelative(values,)
  const relativeDifferences = getRelativeDifferences(values,)
  return Math.sqrt(average(relativeDifferences.map((diff,) => (diff - relativeMean) ** 2),),)
}
