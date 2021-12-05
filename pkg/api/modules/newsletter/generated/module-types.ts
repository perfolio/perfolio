import * as Types from "../../../generated/schema-types"
import * as gm from "graphql-modules"
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
