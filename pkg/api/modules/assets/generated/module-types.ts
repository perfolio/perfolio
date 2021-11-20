import * as gm from "graphql-modules"
import * as Types from "../../../generated/schema-types"
export namespace AssetsModule {
  interface DefinedFields {
    Company:
      | "id"
      | "isin"
      | "figi"
      | "name"
      | "logo"
      | "ticker"
      | "country"
      | "sector"
      | "type"
      | "assetHistory"
    ETF:
      | "id"
      | "isin"
      | "figi"
      | "name"
      | "logo"
      | "ticker"
      | "type"
      | "assetHistory"
    Crypto:
      | "id"
      | "isin"
      | "name"
      | "ticker"
      | "logo"
      | "assetHistory"
      | "type"
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
      | "figi"
      | "name"
      | "logo"
      | "ticker"
      | "type"
      | "assetHistory"
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
      figi?: gm.Middleware[]
      name?: gm.Middleware[]
      logo?: gm.Middleware[]
      ticker?: gm.Middleware[]
      country?: gm.Middleware[]
      sector?: gm.Middleware[]
      type?: gm.Middleware[]
      assetHistory?: gm.Middleware[]
    }
    ETF?: {
      "*"?: gm.Middleware[]
      id?: gm.Middleware[]
      isin?: gm.Middleware[]
      figi?: gm.Middleware[]
      name?: gm.Middleware[]
      logo?: gm.Middleware[]
      ticker?: gm.Middleware[]
      type?: gm.Middleware[]
      assetHistory?: gm.Middleware[]
    }
    Crypto?: {
      "*"?: gm.Middleware[]
      id?: gm.Middleware[]
      isin?: gm.Middleware[]
      name?: gm.Middleware[]
      ticker?: gm.Middleware[]
      logo?: gm.Middleware[]
      assetHistory?: gm.Middleware[]
      type?: gm.Middleware[]
    }
    Mutation?: {
      "*"?: gm.Middleware[]
      createExchangeTradedAsset?: gm.Middleware[]
    }
  }
}
