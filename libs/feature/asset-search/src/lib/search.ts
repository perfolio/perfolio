import Fuse from "fuse.js"
import { StockMap } from "@perfolio/integrations/prisma"

type IsinTickerPair = { isin: string; ticker: string }

export async function search(
  fragment: string,
  stockMap: StockMap[],
  getTickerFromIsin: (isin: string) => Promise<string>,
): Promise<IsinTickerPair[]> {
  fragment = fragment.toLowerCase()
  const isinMatcher = RegExp(/^[a-z]{2}[a-z0-9]{9}[0-9]$/)
  /**
   * The user has entered a valid ISIN
   */
  if (isinMatcher.test(fragment)) {
    const isin = fragment.toUpperCase()
    console.log({ isin })

    /**
     * If we have the isin in our database we can simply return it and be done.
     */
    const knownMatch = stockMap.find((m) => m.isin === isin)
    if (knownMatch) {
      return [{ isin: knownMatch.isin, ticker: knownMatch.ticker }]
    }
    /**
     * Otherwise we have to lookup the isin in iex and update our internal isin map
     */
    const ticker = await getTickerFromIsin(isin)
    if (!ticker) {
      throw new Error(`No matching ticker found for isin: ${isin}`)
    }

    return [{ isin, ticker }]
  }

  /**
   * Check if the user has entered a known ticker
   */
  const tickerMatch = stockMap.find((m) => m.ticker.toLowerCase() === fragment.toLowerCase())
  if (tickerMatch) {
    return [{ isin: tickerMatch.isin, ticker: tickerMatch.ticker }]
  }

  /**
   * Fallback to find a match in all our stored isins
   */
  const deduplicationRecord: { [isin: string]: boolean } = {}

  const matches = new Fuse(stockMap, {
    includeScore: true,
    shouldSort: true,
    threshold: 1,
    ignoreLocation: true,
    keys: ["name", "ticker"],
  })

    // see https://fusejs.io/examples.html#extended-search
    .search(`="${fragment}"`)
    .map((r) => r.item)
    .filter(({ isin }) => {
      const isDuplicate = deduplicationRecord[isin] ?? false
      deduplicationRecord[isin] = true
      return !isDuplicate
    })
    .slice(0, 5)

  return matches.map(({ isin, ticker }) => ({ isin, ticker }))
}
