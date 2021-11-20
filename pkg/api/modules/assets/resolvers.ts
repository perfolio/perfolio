import { newId } from "@perfolio/pkg/id"
import { getCompany as getCompanyFromIex } from "@perfolio/pkg/integrations/iexcloud"
import { AssetType } from "@perfolio/pkg/integrations/prisma"
import { Context } from "../../context"
import { Resolvers } from "../../generated/schema-types"

export const resolvers: Resolvers<Context> = {
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

      const prices = await ctx.dataSources.iex.getPrices({
        ticker,
      })
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
      ctx.logger.info("Creating new ETA from isin", { isin })

      const foundIsin = await ctx.dataSources.openFigi.findIsin({ isin })
      if (!foundIsin) {
        throw new Error(`Isin not found: ${isin}`)
      }

      ctx.logger.info("Found isin", { foundIsin })

      const assetTypeString = foundIsin.securityType === "ETP"
        ? foundIsin.securityType2
        : foundIsin.securityType

      const assetType = assetTypeString === "Common Stock"
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
      ctx.logger.info("Using this ticker for lookup", { ticker })
      const company = await ctx.dataSources.iex.getCompany(ticker)
ctx.logger.info("Company", {company})
      if (!company) {
        throw new Error(`No Exchange traded asset exists for ticker: ${ticker}`)
      }

      const asset = await ctx.dataSources.db.exchangeTradedAsset.upsert({
        where: { isin },
        update: {},
        create: {
          id: newId("asset"),
          isin,
          name: company.name,
          ticker,
          figi: foundIsin.compositeFIGI,
          logo: company.logo,
          type: assetType,
        },
      })
      ctx.logger.info("Stored asset in db", { asset: JSON.stringify(asset) })

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
      ctx.logger.info("Stored document in search", {
        document: JSON.stringify(document),
      })

      return asset
    },
  },
}
