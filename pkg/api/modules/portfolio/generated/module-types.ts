import * as gm from "graphql-modules"
import * as Types from "../../../generated/schema-types"
export namespace PortfolioModule {
  interface DefinedFields {
    AbsoluteAssetHistory: "assetId" | "asset" | "history"
    Portfolio:
      | "id"
      | "name"
      | "user"
      | "primary"
      | "transactions"
      | "relativeHistory"
      | "absoluteHistory"
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
    Mutation:
      | "createPortfolio"
      | "updatePortfolio"
      | "deletePortfolio"
      | "clonePortfolio"
      | "createTransaction"
      | "updateTransaction"
      | "deleteTransaction"
    User: "portfolio" | "portfolios"
  }

  interface DefinedInputFields {
    CreatePortfolio: "id" | "name" | "userId" | "primary"
    UpdatePortfolio: "id" | "name" | "primary"
    CreateTransaction: "assetId" | "executedAt" | "portfolioId" | "value" | "volume" | "mic"
    UpdateTransaction: "id" | "assetId" | "executedAt" | "portfolioId" | "value" | "volume" | "mic"
  }

  export type AbsoluteAssetHistory = Pick<
    Types.AbsoluteAssetHistory,
    DefinedFields["AbsoluteAssetHistory"]
  >
  export type Asset = Types.Asset
  export type ValueAndQuantityAtTime = Types.ValueAndQuantityAtTime
  export type Portfolio = Pick<Types.Portfolio, DefinedFields["Portfolio"]>
  export type User = Types.User
  export type Transaction = Pick<Types.Transaction, DefinedFields["Transaction"]>
  export type ValueAtTime = Types.ValueAtTime
  export type CreatePortfolio = Pick<Types.CreatePortfolio, DefinedInputFields["CreatePortfolio"]>
  export type UpdatePortfolio = Pick<Types.UpdatePortfolio, DefinedInputFields["UpdatePortfolio"]>
  export type CreateTransaction = Pick<
    Types.CreateTransaction,
    DefinedInputFields["CreateTransaction"]
  >
  export type UpdateTransaction = Pick<
    Types.UpdateTransaction,
    DefinedInputFields["UpdateTransaction"]
  >
  export type Query = Pick<Types.Query, DefinedFields["Query"]>
  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>

  export type AbsoluteAssetHistoryResolvers = Pick<
    Types.AbsoluteAssetHistoryResolvers,
    DefinedFields["AbsoluteAssetHistory"] | "__isTypeOf"
  >
  export type PortfolioResolvers = Pick<
    Types.PortfolioResolvers,
    DefinedFields["Portfolio"] | "__isTypeOf"
  >
  export type TransactionResolvers = Pick<
    Types.TransactionResolvers,
    DefinedFields["Transaction"] | "__isTypeOf"
  >
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields["Query"]>
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields["Mutation"]>
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields["User"]>

  export interface Resolvers {
    AbsoluteAssetHistory?: AbsoluteAssetHistoryResolvers
    Portfolio?: PortfolioResolvers
    Transaction?: TransactionResolvers
    Query?: QueryResolvers
    Mutation?: MutationResolvers
    User?: UserResolvers
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[]
    }
    AbsoluteAssetHistory?: {
      "*"?: gm.Middleware[]
      assetId?: gm.Middleware[]
      asset?: gm.Middleware[]
      history?: gm.Middleware[]
    }
    Portfolio?: {
      "*"?: gm.Middleware[]
      id?: gm.Middleware[]
      name?: gm.Middleware[]
      user?: gm.Middleware[]
      primary?: gm.Middleware[]
      transactions?: gm.Middleware[]
      relativeHistory?: gm.Middleware[]
      absoluteHistory?: gm.Middleware[]
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
    Mutation?: {
      "*"?: gm.Middleware[]
      createPortfolio?: gm.Middleware[]
      updatePortfolio?: gm.Middleware[]
      deletePortfolio?: gm.Middleware[]
      clonePortfolio?: gm.Middleware[]
      createTransaction?: gm.Middleware[]
      updateTransaction?: gm.Middleware[]
      deleteTransaction?: gm.Middleware[]
    }
  }
}
