import * as Types from "../../../generated/schema-types"
import * as gm from "graphql-modules"
export namespace PortfolioModule {
  interface DefinedFields {
    Portfolio: "id" | "name" | "user" | "primary"
    User: "portfolio" | "portfolios"
  }

  export type Portfolio = Pick<Types.Portfolio, DefinedFields["Portfolio"]>
  export type User = Types.User

  export type PortfolioResolvers = Pick<
    Types.PortfolioResolvers,
    DefinedFields["Portfolio"] | "__isTypeOf"
  >
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields["User"]>

  export interface Resolvers {
    Portfolio?: PortfolioResolvers
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
    }
    User?: {
      "*"?: gm.Middleware[]
      portfolio?: gm.Middleware[]
      portfolios?: gm.Middleware[]
    }
  }
}
