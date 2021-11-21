import * as gm from "graphql-modules"
import * as Types from "../../../generated/schema-types"
export namespace SettingsModule {
  interface DefinedFields {
    Settings: "defaultCurrency" | "defaultExchange" | "defaultExchangeMic"
    Mutation: "createSettings" | "updateSettings"
    User: "settings"
  }

  interface DefinedInputFields {
    CreateSettings: "defaultCurrency" | "defaultExchangeId" | "userId"
    UpdateSettings: "defaultCurrency" | "defaultExchangeId" | "userId"
  }

  export type Settings = Pick<Types.Settings, DefinedFields["Settings"]>
  export type Exchange = Types.Exchange
  export type CreateSettings = Pick<
    Types.CreateSettings,
    DefinedInputFields["CreateSettings"]
  >
  export type UpdateSettings = Pick<
    Types.UpdateSettings,
    DefinedInputFields["UpdateSettings"]
  >
  export type User = Types.User
  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>

  export type SettingsResolvers = Pick<
    Types.SettingsResolvers,
    DefinedFields["Settings"] | "__isTypeOf"
  >
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields["Mutation"]
  >
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields["User"]>

  export interface Resolvers {
    Settings?: SettingsResolvers
    Mutation?: MutationResolvers
    User?: UserResolvers
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[]
    }
    Settings?: {
      "*"?: gm.Middleware[]
      defaultCurrency?: gm.Middleware[]
      defaultExchange?: gm.Middleware[]
      defaultExchangeMic?: gm.Middleware[]
    }
    User?: {
      "*"?: gm.Middleware[]
      settings?: gm.Middleware[]
    }
    Mutation?: {
      "*"?: gm.Middleware[]
      createSettings?: gm.Middleware[]
      updateSettings?: gm.Middleware[]
    }
  }
}
