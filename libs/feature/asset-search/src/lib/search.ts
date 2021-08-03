import Fuse from "fuse.js"
type IsinTickerPair = { isin: string; ticker: string }

type IsinMap = {
  isin: string
  ticker: string
  name: string
}[]

export async function search(
  fragment: string,
  isinMap: IsinMap,
  getSymbolsFromIsin: (isin: string) => Promise<string[]>,
): Promise<IsinTickerPair[]> {
  fragment = fragment.toLowerCase()
  const isinMatcher = RegExp(/^[a-z]{2}[a-z0-9]{9}[0-9]$/)
  /**
   * The user has entered a valid ISIN
   */
  if (isinMatcher.test(fragment)) {
    const isin = fragment.toUpperCase()

    /**
     * If we have the isin in our database we can simply return it and be done.
     */
    const knownMatch = isinMap.find((m) => m.isin === isin)
    if (knownMatch) {
      return [{ isin: knownMatch.isin, ticker: knownMatch.ticker }]
    }
    /**
     * Otherwise we have to lookup the isin in iex and update our internal isin map
     */
    const symbols = await getSymbolsFromIsin(isin)
    const ticker = symbols.find((i) => !i.includes("-"))
    if (!ticker) {
      throw new Error(`No matching ticker found for isin: ${isin}`)
    }

    return [{ isin, ticker }]
  }

  /**
   * Check if the user has entered a known ticker
   */
  const tickerMatch = isinMap.find((m) => m.ticker.toLowerCase() === fragment.toLowerCase())
  if (tickerMatch) {
    return [{ isin: tickerMatch.isin, ticker: tickerMatch.ticker }]
  }

  /**
   * Fallback to find a match in all our stored isins
   */
  const deduplicationRecord: { [isin: string]: boolean } = {}

  const matches = new Fuse(isinMap, {
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
