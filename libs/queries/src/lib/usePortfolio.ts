import { useGetPortfolioHistoryQuery, ValueAndQuantityAtTime } from "@perfolio/api/graphql"
import { useUser } from "@clerk/clerk-react"

export const usePortfolio = () => {
  const user = useUser()
  const { data, ...meta } = useGetPortfolioHistoryQuery({ variables: { userId: user.id } })
  const history = data?.getPortfolioHistory ?? []

  const getLastValid = (history: ValueAndQuantityAtTime[]): { quantity: number; value: number } => {
    const sorted = [...history].sort((a, b) => b.time - a.time)

    for (const day of sorted) {
      if (day.value > 0) {
        return day
      }
    }
    throw new Error("Nothing found")
  }
  const portfolio = history.map((h) => {
    return {
      asset: {
        company: h.asset.__typename === "Stock" ? h.asset.company : undefined,
        id: h.asset.id,
      },
      ...getLastValid(h.history),
    }
  })

  /**
   * Remove all assets that the user has sold completely
   *
   * If this step is omitted we would display symbols with quantity = 0 and all
   * derived values are nonsense.
   */
  Object.values(portfolio).filter(({ value }) => value > 0)

  return { portfolio, ...meta }
}
