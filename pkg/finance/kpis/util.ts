export function getRelativeDifferences(values: number[],): number[] {
  if (values.length < 2) {
    throw new Error("Not enough values to calculate relative differences",)
  }
  const differences: number[] = []
  for (let i = 0; i < values.length - 1; i++) {
    differences.push(values[i + 1] / values[i] - 1,)
  }
  return differences
}

export function getAbsoluteDifferences(values: number[],): number[] {
  if (values.length < 2) {
    throw new Error("Not enough values to calculate absolute differences",)
  }
  const differences: number[] = []
  for (let i = 0; i < values.length - 1; i++) {
    differences.push(values[i + 1] - values[i],)
  }
  return differences
}
