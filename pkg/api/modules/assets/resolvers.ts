import { newId } from "@perfolio/pkg/id"
import { AssetType } from "@perfolio/pkg/integrations/prisma"
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
        `Unable to decide what type of ExchangeTradedAsset this is: ${
          JSON.stringify(
            asset,
          )
        }`,
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
        `Unable to decide what type of ExchangeTradedAsset this is: ${
          JSON.stringify(
            asset,
          )
        }`,
      )
    },

    assetHistory: async (asset, { mic, start, end }, ctx) => {
      const foundIsin = await ctx.dataSources.openFigi.findIsin({
        isin: asset.isin,
        micCode: mic,
      })
      if (!foundIsin) {
        throw new Error(
          `Unable to find the symbol for ${asset.isin} at exchange: ${mic}`,
        )
      }

      const ticker = foundIsin.compositeFIGI === foundIsin.figi
        ? foundIsin.ticker
        : [foundIsin.ticker, foundIsin.exchCode].join("-")

      const prices = await ctx.dataSources.iex.getHistory(ticker)
      return Object.entries(prices)
        .filter(([time]) => Number(time) >= start && Number(time) <= end)
        .map((time, value) => ({
          time: Number(time),
          value,
        }))
    },
  },

  Mutation: {
    createExchangeTradedAsset: async (_root, { isin }, ctx) => {
      ctx.logger.debug("Adding asset", { isin })
      const foundIsin = await ctx.dataSources.openFigi.findIsin({ isin })
      if (!foundIsin) {
        throw new Error(`Isin not found: ${isin}`)
      }

      const assetTypeString = foundIsin.securityType === "ETP"
        ? foundIsin.securityType2
        : foundIsin.securityType

      const assetType = assetTypeString === "Common Stock" || assetTypeString === "REIT"
        ? AssetType.COMMON_STOCK
        : assetTypeString === "Mutual Fund"
        ? AssetType.MUTUAL_FUND
        : AssetType.TODO

      /**
       * IEX uses these composite tickers for lookups
       */

      const ticker = foundIsin.compositeFIGI === foundIsin.figi
        ? foundIsin.ticker
        : [foundIsin.ticker, foundIsin.exchCode].join("-")
      const company = await ctx.dataSources.iex.getCompany(ticker)
      if (!company) {
        throw new Error(
          `No Exchange traded asset exists for ticker: ${ticker}`,
        )
      }
      const create = {
        id: newId("asset"),
        isin,
        name: company.name ?? "",
        ticker,
        figi: foundIsin.compositeFIGI,
        logo: company.logo,
        type: assetType,
      }

      ctx.logger.debug("Store asset in db", { create })

      const asset = await ctx.dataSources.db.exchangeTradedAsset.upsert({
        where: { isin },
        update: {},
        create,
      })

      const document: {
        asset: {
          id: string
          isin: string
          logo: string
          ticker: string
          name: string
          type: string
        }
        meta: Record<string, unknown>
      } = {
        asset,
        meta: {
          ...company,
        },
      }
      const res = await fetch(
        "https://search-l1vg.onrender.com/ingest/perfolio",
        {
          method: "POST",
          body: JSON.stringify(document),
        },
      )
      if (!res.ok) {
        throw new Error(`Unable to ingest document into search`)
      }

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
  },
}