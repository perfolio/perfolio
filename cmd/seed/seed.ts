import { client } from "pkg/hooks/client"

import fs from "fs"

async function main() {
  const isins = (JSON.parse(fs.readFileSync("./cmd/seed/isins.json").toString()) as string[]).sort(
    () => 0.5 - Math.random(),
  )

  const c = client()
  for (let i = 0; i < isins.length; i++) {
    console.log(`${i} / ${isins.length} : ${(i / isins.length).toFixed(2)}%`)
    await c.createExchangeTradedAsset({ isin: isins[i] }).catch((err) => {
      console.error(err)
    })
  }
}

main()
