import * as Types from "../../../generated/schema-types"
import * as gm from "graphql-modules"
export namespace UtilModule {
  interface DefinedFields {
    ValueAndQuantityAtTime: "quantity" | "time" | "value"
    ValueAtTime: "time" | "value"
  }

  export type ValueAndQuantityAtTime = Pick<
    Types.ValueAndQuantityAtTime,
    DefinedFields["ValueAndQuantityAtTime"]
  >
  export type ValueAtTime = Pick<Types.ValueAtTime, DefinedFields["ValueAtTime"]>

  export type ValueAndQuantityAtTimeResolvers = Pick<
    Types.ValueAndQuantityAtTimeResolvers,
    DefinedFields["ValueAndQuantityAtTime"] | "__isTypeOf"
  >
  export type ValueAtTimeResolvers = Pick<
    Types.ValueAtTimeResolvers,
    DefinedFields["ValueAtTime"] | "__isTypeOf"
  >

  export interface Resolvers {
    ValueAndQuantityAtTime?: ValueAndQuantityAtTimeResolvers
    ValueAtTime?: ValueAtTimeResolvers
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[]
    }
    ValueAndQuantityAtTime?: {
      "*"?: gm.Middleware[]
      quantity?: gm.Middleware[]
      time?: gm.Middleware[]
      value?: gm.Middleware[]
    }
    ValueAtTime?: {
      "*"?: gm.Middleware[]
      time?: gm.Middleware[]
      value?: gm.Middleware[]
    }
  }
}
