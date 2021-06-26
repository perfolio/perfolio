import { ReturnsPerAsset, AssetsOverTime } from "./types"

/**
 * Catch division by 0
 */
const calculateReturns = (today: number, yesterday: number): number => {
  return yesterday === 0 ? 0 : today / yesterday - 1
}

export const calculateReturnsPerAsset = (assetsOverTime: AssetsOverTime): ReturnsPerAsset => {
  const returns = {} as ReturnsPerAsset

  const timestamps = Object.keys(assetsOverTime)

  for (let i = 0; i < timestamps.length; i++) {
    const day = Object.entries(assetsOverTime)[i]

    const time = Number(day[0])

    const assets = day[1]

    if (!returns[time]) {
      returns[time] = {}
    }

    Object.entries(assets).forEach(([assetId, today]) => {
      let yesterday: { value: number } | undefined
      try {
        yesterday = Object.values(assetsOverTime)[i - 1][assetId]
      } catch {
        yesterday = undefined
      }
      returns[time][assetId] =
        !yesterday || yesterday.value === 0 ? 0 : today.value / yesterday.value - 1
      returns[time][assetId] = calculateReturns(today.value, yesterday?.value ?? 0)
    })
  }
  return returns
}
