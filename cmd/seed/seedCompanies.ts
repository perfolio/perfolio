import { getCompany, getIsinMapping, getLogo } from "@perfolio/pkg/integrations/iexcloud"
import { AssetType, PrismaClient } from "@perfolio/pkg/integrations/prisma"
import { randomUUID } from "crypto"
import fs from "fs"

async function main() {
  let isins = JSON.parse(fs.readFileSync("cmd/seed/isins.json").toString()) as string[]
  const assets = JSON.parse(fs.readFileSync("cmd/seed/assets.json").toString()) as {
    asset: { isin: string }
  }[]
  const existingIsins = Object.values(assets).map((a) => a.asset.isin)

  isins = isins.filter((isin) => !existingIsins.includes(isin))
  const start = Date.now()
  const prisma = new PrismaClient()
  console.log("START")
  for (let i = 0; i < isins.length; i++) {
    const isin = isins[i]

    const isinMap = await getIsinMapping(isin)
    const ticker = isinMap.find(({ symbol }) => !symbol.includes("-"))?.symbol

    if (!ticker) {
      console.log({ isin })
      continue
    }

    const [company, logo] = await Promise.all([getCompany(ticker), getLogo(ticker)])
    console.log("2")
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

    await prisma.exchangeTradedAsset.create({
      data: {
        id: `eta_${randomUUID().replace(/-/g, "")}`,
        isin,
        ticker: company.symbol,
        name: company.companyName ?? "",
        logo: "",
        type: AssetType.COMMON_STOCK,
        figi: "",
      },
    })
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
