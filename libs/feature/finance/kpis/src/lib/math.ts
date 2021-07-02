import { Mean } from "./mean"

export function average(values: number[]): number {
  return values.reduce((acc, val) => acc + val, 0) / values.length
}

export function standardDeviation(values: number[]): number {
  const relativeMean = Mean.getRelative(values)
  return Math.sqrt(average(values.map((diff) => (diff - relativeMean) ** 2)))
}
