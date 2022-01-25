import { newId } from "@perfolio/pkg/id"
import { AssetType, ExchangeTradedAssetModel } from "@perfolio/pkg/integrations/prisma"
import { Key } from "@perfolio/pkg/integrations/redis"
import Fuse from "fuse.js"
import { Context } from "../../context"
import { Resolvers } from "../../generated/schema-types"

export const resolvers: Resolvers<Context> = {
  Asset: {
    __resolveType(asset) {
      if (asset.type === AssetType.COMMON_STOCK) {
        return "Company"
      }
      if (asset.type === AssetType.MUTUAL_FUND) {
        return "ETF"
      }
      throw new Error(
        `Unable to decide what type of ExchangeTradedAsset this is: ${JSON.stringify(asset)}`,
      )
    },
  },
  Company: {
    sector: async (company, _args, ctx) => {
      const res = await ctx.dataSources.iex.getCompany(company.ticker)
      if (!res) {
        throw new Error(`No company found for ticker: ${company.ticker}`)
      }
      return res.sector
    },
    country: async (company, _args, ctx) => {
      const res = await ctx.dataSources.iex.getCompany(company.ticker)
      if (!res) {
        throw new Error(`No company found for ticker: ${company.ticker}`)
      }
      return res.country
    },
    assetHistory: async (asset, { mic, start, end }, ctx) => {
      const foundIsins = await ctx.dataSources.openFigi.findIsin({
        isin: asset.isin,
        micCode: mic,
      })
      if (foundIsins.length === 0) {
        throw new Error(`Unable to find the symbol for ${asset.isin} at exchange: ${mic}`)
      }

      const ticker =
        foundIsins[0].compositeFIGI === foundIsins[0].figi
          ? foundIsins[0].ticker
          : `${foundIsins[0].ticker}-${foundIsins[0].exchCode}`

      const prices = await ctx.dataSources.iex.getHistory(ticker)

      let result = Object.entries(prices)
        .filter(
          ([time]) =>
            (typeof start === "undefined" || Number(time) >= start) &&
            (typeof end === "undefined" || Number(time) <= end),
        )
        .map(([time, value]) => {
          return {
            time: Number(time),
            value,
          }
        })
      return result
    },
  },
  ExchangeTradedAsset: {
    __resolveType: (asset) => {
      if (asset.type === AssetType.COMMON_STOCK) {
        return "Company"
      }
      if (asset.type === AssetType.MUTUAL_FUND) {
        return "ETF"
      }
      throw new Error(
        `Unable to decide what type of ExchangeTradedAsset this is: ${JSON.stringify(asset)}`,
      )
    },

    assetHistory: async (asset, { mic, start, end }, ctx) => {
      const foundIsins = await ctx.dataSources.openFigi.findIsin({
        isin: asset.isin,
        micCode: mic,
      })
      if (foundIsins.length === 0) {
        throw new Error(`Unable to find the symbol for ${asset.isin} at exchange: ${mic}`)
      }

      const ticker =
        foundIsins[0].compositeFIGI === foundIsins[0].figi
          ? foundIsins[0].ticker
          : `${foundIsins[0].ticker}-${foundIsins[0].exchCode}`

      const prices = await ctx.dataSources.iex.getHistory(ticker)
      return Object.entries(prices)
        .filter(
          ([time]) =>
            (typeof start === "undefined" || Number(time) >= start) &&
            (typeof end === "undefined" || Number(time) <= end),
        )
        .map((time, value) => ({
          time: Number(time),
          value,
        }))
    },
  },

  Mutation: {
    createExchangeTradedAsset: async (_root, { isin }, ctx) => {
      ctx.logger.debug("Adding asset", { isin })
      const foundIsins = await ctx.dataSources.openFigi.findIsin({ isin })

      const foundIsin = foundIsins.find((i) => i.figi === i.compositeFIGI)
      if (!foundIsin) {
        throw new Error(`Isin not found: ${isin}`)
      }
      const assetTypeString =
        foundIsin.securityType === "ETP" ? foundIsin.securityType2 : foundIsin.securityType

      const assetType =
        assetTypeString === "Common Stock" || assetTypeString === "REIT"
          ? AssetType.COMMON_STOCK
          : assetTypeString === "Mutual Fund"
          ? AssetType.MUTUAL_FUND
          : AssetType.TODO

      const iexIsins = await ctx.dataSources.iex.findTicker(isin)

      const ticker = iexIsins.find((i) => !i.symbol.includes("-"))!.symbol

      const company = await ctx.dataSources.iex.getCompany(ticker)
      if (!company) {
        throw new Error(`No Exchange traded asset exists for ticker: ${ticker}`)
      }
      const create = {
        id: newId("asset"),
        isin,
        name: company.name ?? "",
        ticker,
        figi: foundIsin.figi,
        logo: company.logo,
        type: assetType,
      }

      ctx.logger.debug("Store asset in db", { create })

      const asset = await ctx.dataSources.db.exchangeTradedAsset.upsert({
        where: { isin },
        update: {},
        create,
      })

      return asset
    },
  },
  Query: {
    exchangeTradedAsset: async (_root, { assetId }, ctx) => {
      return (
        (await ctx.dataSources.db.exchangeTradedAsset.findUnique({
          where: { id: assetId },
        })) ?? undefined
      )
    },
    search: async (_root, { fragment }, ctx) => {
      await ctx.authorizeUser(["read:asset"])
      console.time(`search.${fragment}`)
      const assetKey = new Key("assets")
      let assets = await ctx.cache.get<ExchangeTradedAssetModel[]>(assetKey)
      if (!assets) {
        assets = await ctx.dataSources.db.exchangeTradedAsset.findMany()
        await ctx.cache.set("5m", { key: assetKey, value: assets })
      }
      const key = new Key("assetSearchIndex")
      let rawIndex = await ctx.cache.get(key)
      const options = { keys: ["isin", "ticker", "name"] }

      let index: Fuse.FuseIndex<ExchangeTradedAssetModel>
      if (rawIndex) {
        index = Fuse.parseIndex(rawIndex)
      } else {
        ctx.logger.info("Building new search index")
        index = Fuse.createIndex(options.keys, assets)
        if (!index) {
          throw new Error("Unable to generate search index")
        }
        await ctx.cache.set("5m", { key, value: index.toJSON() })
      }
      const fuse = new Fuse(assets ?? [], options, index)
      const res = fuse.search(fragment, { limit: 10 })
      console.timeEnd(`search.${fragment}`)

      return res.map((asset) => asset.item)
    },
  },
}
