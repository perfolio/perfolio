import { useHistory } from "./history"

export interface Portfolio {
  [assetID: string]: { quantity: number; value: number }
}
/**
 * Start from the last entry and go back.
 * Return the first entry that has a value > 0
 *
 * We store prices with value `-1` on weekends for example, but we need a "real"
 * value here.
 */
const getLastWithValue = (
  arr: { quantity: number; value: number }[],
): { quantity: number; value: number } => {
  if (arr.length >= 1) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!!arr[i] && arr[i].value > 0) {
        return arr[i]
      }
    }
  }
  throw new Error("Nope")
}

export const usePortfolio = () => {
  const { history, ...meta } = useHistory()

  const portfolio: Portfolio = {}
  if (history) {
    Object.entries(history).forEach(([assetId, timeline]) => {
      const latest = getLastWithValue(timeline)
      portfolio[assetId] = {
        quantity: latest.quantity,
        value: latest.value,
      }
    })
  }
  console.log({portfolio})

  return { portfolio, ...meta }
}
