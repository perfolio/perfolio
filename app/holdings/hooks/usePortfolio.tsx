import {} from "blitz"
import { useHistory } from "./useHistory"

export interface Portfolio {
  [assetID: string]: { quantity: number; value: number }
}

const getLastWithValue = (
  arr: { quantity: number; value: number }[],
): { quantity: number; value: number } => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!!arr[i] && arr[i]!.value > 0) {
      return arr[i]!
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

  return { portfolio, ...meta }
}
