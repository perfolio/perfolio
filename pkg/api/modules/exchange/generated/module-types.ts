import * as Types from "../../../generated/schema-types";
import * as gm from "graphql-modules";
export namespace ExchangeModule {
  interface DefinedFields {
    Exchange: "mic" | "description" | "region" | "suffix";
    Query: "exchanges";
  }

  export type Exchange = Pick<Types.Exchange, DefinedFields["Exchange"]>;
  export type Query = Pick<Types.Query, DefinedFields["Query"]>;

  export type ExchangeResolvers = Pick<
    Types.ExchangeResolvers,
    DefinedFields["Exchange"] | "__isTypeOf"
  >;
  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields["Query"]
  >;

  export interface Resolvers {
    Exchange?: ExchangeResolvers;
    Query?: QueryResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    Exchange?: {
      "*"?: gm.Middleware[];
      mic?: gm.Middleware[];
      description?: gm.Middleware[];
      region?: gm.Middleware[];
      suffix?: gm.Middleware[];
    };
    Query?: {
      "*"?: gm.Middleware[];
      exchanges?: gm.Middleware[];
    };
  }
}
