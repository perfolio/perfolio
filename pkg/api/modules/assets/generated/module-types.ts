import * as gm from "graphql-modules"
import * as Types from "../../../generated/schema-types"
export namespace AssetsModule {
  interface DefinedFields {
    Company:
      | "id"
      | "isin"
      | "ticker"
      | "name"
      | "logo"
      | "type"
      | "assetHistory"
      | "figi"
      | "country"
      | "sector"
    ETF:
      | "id"
      | "isin"
      | "ticker"
      | "name"
      | "logo"
      | "type"
      | "assetHistory"
      | "figi"
    Crypto:
      | "id"
      | "isin"
      | "ticker"
      | "name"
      | "logo"
      | "type"
      | "assetHistory"
    Query: "exchangeTradedAsset"
    Mutation: "createExchangeTradedAsset"
    Asset: "id" | "name"
    ExchangeTradedAsset:
      | "id"
      | "isin"
      | "ticker"
      | "name"
      | "logo"
      | "type"
      | "assetHistory"
    Stock:
      | "id"
      | "isin"
      | "ticker"
      | "name"
      | "logo"
      | "type"
      | "assetHistory"
      | "figi"
  }

  interface DefinedEnumValues {
    AssetType: "MUTUAL_FUND" | "COMMON_STOCK" | "CRYPTO" | "TODO"
  }

  export type AssetType = DefinedEnumValues["AssetType"]
  export type Asset = Pick<Types.Asset, DefinedFields["Asset"]>
  export type ExchangeTradedAsset = Pick<
    Types.ExchangeTradedAsset,
    DefinedFields["ExchangeTradedAsset"]
  >
  export type ValueAtTime = Types.ValueAtTime
  export type Stock = Pick<Types.Stock, DefinedFields["Stock"]>
  export type Company = Pick<Types.Company, DefinedFields["Company"]>
  export type ETF = Pick<Types.Etf, DefinedFields["ETF"]>
  export type Crypto = Pick<Types.Crypto, DefinedFields["Crypto"]>
  export type Query = Pick<Types.Query, DefinedFields["Query"]>
  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>

  export type CompanyResolvers = Pick<
    Types.CompanyResolvers,
    DefinedFields["Company"] | "__isTypeOf"
  >
  export type ETFResolvers = Pick<
    Types.EtfResolvers,
    DefinedFields["ETF"] | "__isTypeOf"
  >
  export type CryptoResolvers = Pick<
    Types.CryptoResolvers,
    DefinedFields["Crypto"] | "__isTypeOf"
  >
  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields["Query"]
  >
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields["Mutation"]
  >
  export type AssetResolvers = Pick<
    Types.AssetResolvers,
    DefinedFields["Asset"]
  >
  export type ExchangeTradedAssetResolvers = Pick<
    Types.ExchangeTradedAssetResolvers,
    DefinedFields["ExchangeTradedAsset"]
  >
  export type StockResolvers = Pick<
    Types.StockResolvers,
    DefinedFields["Stock"]
  >

  export interface Resolvers {
    Company?: CompanyResolvers
    ETF?: ETFResolvers
    Crypto?: CryptoResolvers
    Query?: QueryResolvers
    Mutation?: MutationResolvers
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[]
    }
    Company?: {
      "*"?: gm.Middleware[]
      id?: gm.Middleware[]
      isin?: gm.Middleware[]
      ticker?: gm.Middleware[]
      name?: gm.Middleware[]
      logo?: gm.Middleware[]
      type?: gm.Middleware[]
      assetHistory?: gm.Middleware[]
      figi?: gm.Middleware[]
      country?: gm.Middleware[]
      sector?: gm.Middleware[]
    }
    ETF?: {
      "*"?: gm.Middleware[]
      id?: gm.Middleware[]
      isin?: gm.Middleware[]
      ticker?: gm.Middleware[]
      name?: gm.Middleware[]
      logo?: gm.Middleware[]
      type?: gm.Middleware[]
      assetHistory?: gm.Middleware[]
      figi?: gm.Middleware[]
    }
    Crypto?: {
      "*"?: gm.Middleware[]
      id?: gm.Middleware[]
      isin?: gm.Middleware[]
      ticker?: gm.Middleware[]
      name?: gm.Middleware[]
      logo?: gm.Middleware[]
      type?: gm.Middleware[]
      assetHistory?: gm.Middleware[]
    }
    Query?: {
      "*"?: gm.Middleware[]
      exchangeTradedAsset?: gm.Middleware[]
    }
    Mutation?: {
      "*"?: gm.Middleware[]
      createExchangeTradedAsset?: gm.Middleware[]
    }
  }
}
