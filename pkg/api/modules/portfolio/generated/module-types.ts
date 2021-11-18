import * as Types from "../../../generated/schema-types"
import * as gm from "graphql-modules"
export namespace PortfolioModule {
  interface DefinedFields {
    Portfolio: "id" | "name" | "user" | "primary" | "transactions"
    Transaction:
      | "assetId"
      | "asset"
      | "executedAt"
      | "id"
      | "portfolioId"
      | "value"
      | "volume"
      | "mic"
    Query: "portfolio"
    User: "portfolio" | "portfolios"
  }

  export type Portfolio = Pick<Types.Portfolio, DefinedFields["Portfolio"]>
  export type User = Types.User
  export type Transaction = Pick<Types.Transaction, DefinedFields["Transaction"]>
  export type Asset = Types.Asset
  export type Query = Pick<Types.Query, DefinedFields["Query"]>

  export type PortfolioResolvers = Pick<
    Types.PortfolioResolvers,
    DefinedFields["Portfolio"] | "__isTypeOf"
  >
  export type TransactionResolvers = Pick<
    Types.TransactionResolvers,
    DefinedFields["Transaction"] | "__isTypeOf"
  >
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields["Query"]>
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields["User"]>

  export interface Resolvers {
    Portfolio?: PortfolioResolvers
    Transaction?: TransactionResolvers
    Query?: QueryResolvers
    User?: UserResolvers
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[]
    }
    Portfolio?: {
      "*"?: gm.Middleware[]
      id?: gm.Middleware[]
      name?: gm.Middleware[]
      user?: gm.Middleware[]
      primary?: gm.Middleware[]
      transactions?: gm.Middleware[]
    }
    Transaction?: {
      "*"?: gm.Middleware[]
      assetId?: gm.Middleware[]
      asset?: gm.Middleware[]
      executedAt?: gm.Middleware[]
      id?: gm.Middleware[]
      portfolioId?: gm.Middleware[]
      value?: gm.Middleware[]
      volume?: gm.Middleware[]
      mic?: gm.Middleware[]
    }
    User?: {
      "*"?: gm.Middleware[]
      portfolio?: gm.Middleware[]
      portfolios?: gm.Middleware[]
    }
    Query?: {
      "*"?: gm.Middleware[]
      portfolio?: gm.Middleware[]
    }
  }
}
