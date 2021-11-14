import { getCompany, getIsinMapping, getLogo } from "@perfolio/pkg/integrations/iexcloud"
import fs from "fs"
// import fetch from "node-fetch"

async function main() {
  let isins = JSON.parse(fs.readFileSync("cmd/seed/isins.json").toString()) as string[]
  const assets = JSON.parse(fs.readFileSync("cmd/seed/assets.json").toString()) as {
    asset: { isin: string }
  }[]
  const existingIsins = Object.values(assets).map((a) => a.asset.isin)

  isins = isins.filter((isin) => !existingIsins.includes(isin))
  const start = Date.now()

  for (let i = 0; i < isins.length; i++) {
    const isin = isins[i]

    const isinMap = await getIsinMapping(isin)
    const ticker = isinMap.find(({ symbol }) => !symbol.includes("-"))?.symbol

    if (!ticker) {
      continue
    }

    const [company, logo] = await Promise.all([getCompany(ticker), getLogo(ticker)])

    const document: {
      asset: {
        id: string
        isin: string
        logo: string
        ticker: string
        name: string
      }
      meta: Record<string, unknown>
    } = {
      asset: {
        id: isin,
        name: company.companyName ?? "",
        isin,
        logo: logo.url,
        ticker,
      },

      meta: {
        ...company,
      },
    }
    assets.push(document)
    fs.writeFileSync("cmd/seed/assets.json", JSON.stringify(assets))

    // const res = await fetch("https://search-l1vg.onrender.com/ingest/perfolio", {
    //   method: "POST",
    //   body: JSON.stringify(document),
    // })
    console.log(
      ((i / isins.length) * 100).toFixed(2),
      "% |",
      isin,
      `[ ${((Date.now() - start) / i).toFixed(2)} ms per op ]`,
      // await res.text(),
    )
  }
}

main()
