import * as Types from "../../../generated/schema-types";
import * as gm from "graphql-modules";
export namespace UserModule {
  interface DefinedFields {
    User: "id" | "stripeCustomerId";
    Query: "user";
  }

  export type User = Pick<Types.User, DefinedFields["User"]>;
  export type Query = Pick<Types.Query, DefinedFields["Query"]>;

  export type UserResolvers = Pick<
    Types.UserResolvers,
    DefinedFields["User"] | "__isTypeOf"
  >;
  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields["Query"]
  >;

  export interface Resolvers {
    User?: UserResolvers;
    Query?: QueryResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    User?: {
      "*"?: gm.Middleware[];
      id?: gm.Middleware[];
      stripeCustomerId?: gm.Middleware[];
    };
    Query?: {
      "*"?: gm.Middleware[];
      user?: gm.Middleware[];
    };
  }
}
