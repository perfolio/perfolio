import { Company } from "@perfolio/api/graphql"
import { IsinMap } from "@perfolio/integrations/fauna"
import Fuse from "fuse.js"

type IsinTickerPair = { isin: string; ticker: string }

export class AssetSearch {
  private iex: {
    getIsinMapping: (isin: string) => Promise<{ symbol: string }[]>
    getCompany: (ticker: string) => Promise<Omit<Company, "currentValue" | "logo"> | null>
    getCompanyFromIsin: (isin: string) => Promise<Omit<Company, "currentValue" | "logo"> | null>
  }
  private fauna: {
    getIsinMap: () => Promise<IsinMap | null>
    updateIsinMap: (isinMap: IsinMap) => Promise<IsinMap>
  }

  constructor(
    iex: {
      getIsinMapping: (isin: string) => Promise<{ symbol: string }[]>
      getCompany: (ticker: string) => Promise<Omit<Company, "currentValue" | "logo"> | null>
      getCompanyFromIsin: (isin: string) => Promise<Omit<Company, "currentValue" | "logo"> | null>
    },
    fauna: {
      getIsinMap: () => Promise<IsinMap | null>
      updateIsinMap: (isinMap: IsinMap) => Promise<IsinMap>
    },
  ) {
    this.iex = iex
    this.fauna = fauna
  }

  public async search(fragment: string): Promise<IsinTickerPair[]> {
    const isinMap = await this.fauna.getIsinMap()
    if (!isinMap) {
      throw new Error(`Unable to load isinMap`)
    }

    const isinMatcher = RegExp(/^[a-z]{2}[a-z0-9]{9}[0-9]$/)
    /**
     * The user has entered a valid ISIN
     */
    if (isinMatcher.test(fragment)) {
      const isin = fragment.toUpperCase()

      /**
       * If we have the isin in our database we can simply return it and be done.
       */
      const knownMatch = isinMap.data.matches.find((m) => m.isin === isin)
      if (knownMatch) {
        return [{ isin: knownMatch.isin, ticker: knownMatch.ticker }]
      }
      /**
       * Otherwise we have to lookup the isin in iex and update our internal isin map
       */
      const iexIsinMap = await this.iex.getIsinMapping(isin)
      const ticker = iexIsinMap.find((i) => !i.symbol.includes("-"))?.symbol
      if (!ticker) {
        throw new Error(`No matching ticker found for isin: ${isin}`)
      }

      const company = await this.iex.getCompany(ticker)
      if (!company) {
        throw new Error(`Unable to find company for ticker ${ticker}`)
      }
      isinMap.data.matches.push({ isin, ticker, name: company.name })
      await this.fauna.updateIsinMap(isinMap)
      return [{ isin, ticker }]
    }

    /**
     * Check if the user has entered a known ticker
     */
    const tickerMatch = isinMap.data.matches.find((m) => m.ticker.toLowerCase() === fragment)
    if (tickerMatch) {
      return [{ isin: tickerMatch.isin, ticker: tickerMatch.ticker }]
    }

    /**
     * Fallback to find a match in all our stored isins
     */

    const deduplicationRecord: { [isin: string]: boolean } = {}
    const matches = new Fuse(isinMap.data.matches, {
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

    return matches
  }
}
