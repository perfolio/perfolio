import { getCompany, getIsinMapping, getLogo } from "@perfolio/pkg/integrations/iexcloud"
import fs from "fs"
import fetch from "node-fetch"

async function main() {
  const allIsins = JSON.parse(fs.readFileSync("cmd/seed/isins.json").toString()) as string[]
  allIsins.sort(() => 0.5 - Math.random())
  const start = Date.now()
  const BATCH_SIZE = 4
  for (let i = 0; i < allIsins.length; i += BATCH_SIZE) {
    const isins = allIsins.slice(i, Math.min(allIsins.length - 1, i + BATCH_SIZE))

    await Promise.all(
      isins.map(async (isin) => {
        const isinMap = await getIsinMapping(isin)
        const ticker = isinMap.find(({ symbol }) => !symbol.includes("-"))?.symbol

        if (!ticker) {
          return
        }

        const [company, logo] = await Promise.all([getCompany(ticker), getLogo(ticker)])

        const document: {
          asset: {
            id: string
            isin: string
            logo: string
            ticker: string
          }
          meta: Record<string, unknown>
        } = {
          asset: {
            id: isin,
            isin,
            logo: logo.url,
            ticker,
          },

          meta: {
            ...company,
          },
        }

        const res = await fetch("https://search-l1vg.onrender.com/ingest/perfolio", {
          method: "POST",
          body: JSON.stringify(document),
        })
        console.log(
          ((i / allIsins.length) * 100).toFixed(2),
          "% |",
          isin,
          `[ ${((Date.now() - start) / i).toFixed(2)} ms per op ]`,
          await res.text(),
        )
      }),
    )
  }
}

main()
