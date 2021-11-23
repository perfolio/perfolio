import * as gm from "graphql-modules"
import * as Types from "../../../generated/schema-types"
export namespace NewsletterModule {
  interface DefinedFields {
    Mutation: "subscribeToNewsletter"
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
      subscribeToNewsletter?: gm.Middleware[]
    }
  }
}
