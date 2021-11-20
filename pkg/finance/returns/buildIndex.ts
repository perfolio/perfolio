import { ValueAtTime } from "./types"

/**
 * Create a new index for the given returns
 */
export const buildIndex = (totalReturns: ValueAtTime): ValueAtTime => {
  const index: ValueAtTime = {}

  /**
   * drag timestamp, to retrieve the index value from yesterday
   */
  let yesterday = 0
  for (let i = 0; i < Object.keys(totalReturns).length; i++) {
    const time = Object.keys(totalReturns)[i]
    if (i === 0) {
      index[Number(time)] = 1
    } else {
      const returnsToday = Object.values(totalReturns)[i]
      const indexToday = index[yesterday] * (1 + returnsToday)
      index[Number(time)] = indexToday
    }
    yesterday = Number(time)
  }
  return index
}
