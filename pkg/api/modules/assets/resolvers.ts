import { newId, } from "@perfolio/pkg/id"
import { Context, } from "../../context"
import { Resolvers, } from "../../generated/schema-types"

export const resolvers: Resolvers<Context> = {
  ExchangeTradedAsset: {
    __resolveType: () => {
      return "Company"
    },
  },

  Mutation: {
    createExchangeTradedAsset: async (_root, { isin, }, ctx,) => {
      const company = await ctx.dataSources.iex.getCompanyFromIsin(isin,)
      if (!company) {
        throw new Error(`No Exchange traded asset exists for ${isin}`,)
      }

      const asset = await ctx.dataSources.db.exchangeTradedAsset.upsert({
        where: { isin, },
        update: {},
        create: {
          id: newId("asset",),
          isin,
          name: company.name,
          ticker: company.ticker,
        },
      },)

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
          ...asset,
          logo: company.logo,
        },

        meta: {
          ...company,
        },
      }
      const res = await fetch(
        "https://search-l1vg.onrender.com/ingest/perfolio",
        {
          method: "POST",
          body: JSON.stringify(document,),
        },
      )
      if (!res.ok) {
        throw new Error(`Unable to ingest document into search`,)
      }
      return asset
    },
  },
}
