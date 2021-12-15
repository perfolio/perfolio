import * as Types from "../../../generated/schema-types"
import * as gm from "graphql-modules"
export namespace AuthModule {
  interface DefinedFields {
    Mutation: "signIn" | "refresh"
  }

  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>

  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields["Mutation"]>

  export interface Resolvers {
    Mutation?: MutationResolvers
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[]
    }
    Mutation?: {
      "*"?: gm.Middleware[]
      signIn?: gm.Middleware[]
      refresh?: gm.Middleware[]
    }
  }
}
