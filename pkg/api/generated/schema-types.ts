import { GraphQLResolveInfo } from "graphql"
import { UserModel, PortfolioModel } from "@perfolio/pkg/integrations/prisma"
import { DocumentNode } from "graphql"
import gql from "graphql-tag"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

/** Common fields on all assets */
export type Asset = {
  /** Globally unique id */
  id: Scalars["ID"]
  /** Human readable name */
  name: Scalars["String"]
}

/** Company stocks */
export type Company = Asset &
  ExchangeTradedAsset &
  Stock & {
    __typename?: "Company"
    /** The asset value over time at a specific exchange */
    assetHistory: Array<ValueAndQuantityAtTime>
    /** The country where this company is registered */
    country: Scalars["String"]
    /** Financial Instrument Global Identifier */
    figi: Scalars["String"]
    /** A globally unique id */
    id: Scalars["ID"]
    /** International Securities Identification Number */
    isin: Scalars["String"]
    /** The companys logo url */
    logo: Scalars["String"]
    /** The companys name */
    name: Scalars["String"]
    /** The sector of this company */
    sector: Scalars["String"]
    /** The ticker of a stock. This does not include pre/suffixes for different exchanges */
    ticker: Scalars["String"]
  }

/** Company stocks */
export type CompanyAssetHistoryArgs = {
  end: Scalars["Int"]
  exchangeId: Scalars["ID"]
  start: Scalars["Int"]
}

/**
 * "
 * Create a new user settings object when a new user signs up
 */
export type CreateSettings = {
  /** The user's default currency. Everything will be converted to this currency. */
  defaultCurrency: Scalars["String"]
  /**
   * The user's default exchange. At the start only 1 exchange can be used.
   * This must be the MIC!
   */
  defaultExchange: Scalars["String"]
  /** The unique user id */
  userId: Scalars["ID"]
}

/** Crypto */
export type Crypto = Asset &
  ExchangeTradedAsset & {
    __typename?: "Crypto"
    /** The asset value over time at a specific exchange */
    assetHistory: Array<ValueAndQuantityAtTime>
    /** A globally unique id */
    id: Scalars["ID"]
    /** International Securities Identification Number */
    isin: Scalars["String"]
    /** B */
    logo: Scalars["String"]
    /** Dummy field */
    name: Scalars["String"]
    /** A */
    ticker: Scalars["String"]
  }

/** Crypto */
export type CryptoAssetHistoryArgs = {
  end: Scalars["Int"]
  exchangeId: Scalars["ID"]
  start: Scalars["Int"]
}

/** An exchange where shares are traded */
export type Exchange = {
  __typename?: "Exchange"
  /** Exchange abbreviation */
  abbreviation: Scalars["String"]
  /** Market Identifier Code using ISO 10383 */
  mic: Scalars["ID"]
  /** Full name of the exchange. */
  name: Scalars["String"]
  /** 2 letter case insensitive string of country codes using ISO 3166-1 alpha-2 */
  region: Scalars["String"]
  /** Exchange Suffix to be added for symbols on that exchange */
  suffix?: Maybe<Scalars["String"]>
}

/** A sub type of assets that are all traded at exchanges */
export type ExchangeTradedAsset = {
  /** The asset value over time at a specific exchange */
  assetHistory: Array<ValueAndQuantityAtTime>
  /** A globally unique id */
  id: Scalars["ID"]
  /** International Securities Identification Number */
  isin: Scalars["String"]
  /** URL to the logo or image */
  logo: Scalars["String"]
  /** Human readable name */
  name: Scalars["String"]
  /** The ticker as used by the exchanges. */
  ticker: Scalars["String"]
}

/** A sub type of assets that are all traded at exchanges */
export type ExchangeTradedAssetAssetHistoryArgs = {
  end: Scalars["Int"]
  exchangeId: Scalars["ID"]
  start: Scalars["Int"]
}

export type Mutation = {
  __typename?: "Mutation"
  _?: Maybe<Scalars["Boolean"]>
  createSettings: Settings
  /** Only update some values in the user settings. */
  updateSettings: Settings
}

export type MutationCreateSettingsArgs = {
  settings: CreateSettings
}

export type MutationUpdateSettingsArgs = {
  settings: UpdateSettings
}

export type Portfolio = {
  __typename?: "Portfolio"
  /** unique id */
  id: Scalars["ID"]
  /** Human readable name for the portfolio */
  name: Scalars["String"]
  /** The primary portfolio will be displayed by default */
  primary: Scalars["Boolean"]
  transactions: Array<Transaction>
  /** The owner of this portfolio */
  user: User
}

export type Query = {
  __typename?: "Query"
  /**
   * "
   * Get a list of all availale exchanges
   */
  exchanges: Array<Exchange>
  healthCheck: Scalars["Boolean"]
  /** Return a portfolio by its id */
  portfolio?: Maybe<Portfolio>
  user?: Maybe<User>
}

export type QueryPortfolioArgs = {
  portfolioId: Scalars["ID"]
}

export type QueryUserArgs = {
  userId: Scalars["ID"]
}

/** Settings that can be customized by the user such as preferences as well as defaults */
export type Settings = {
  __typename?: "Settings"
  /** The user's default currency. Everything will be converted to this currency. */
  defaultCurrency: Scalars["String"]
  /** The user's default exchange. At the start only 1 exchange can be used. */
  defaultExchange: Exchange
  /** Used to store the exchange in the db */
  defaultExchangeMic: Scalars["String"]
}

/** Stocks such as company shares and funds. */
export type Stock = {
  /** The asset value over time at a specific exchange */
  assetHistory: Array<ValueAndQuantityAtTime>
  /** The country where this company is registered */
  country: Scalars["String"]
  /** Financial Instrument Global Identifier */
  figi?: Maybe<Scalars["String"]>
  /** A globally unique id */
  id: Scalars["ID"]
  /** International Securities Identification Number */
  isin: Scalars["String"]
  /** The companys logo url */
  logo: Scalars["String"]
  /** The companys name */
  name: Scalars["String"]
  /** The ticker of a stock. This does not include pre/suffixes for different exchanges */
  ticker: Scalars["String"]
}

/** Stocks such as company shares and funds. */
export type StockAssetHistoryArgs = {
  end: Scalars["Int"]
  exchangeId: Scalars["ID"]
  start: Scalars["Int"]
}

/**
 * "
 * A transactions represents a single purchase or sale of any number of shares of a single asset.
 */
export type Transaction = {
  __typename?: "Transaction"
  /** The of asset. Stocks, Crypto, Real estate for example. */
  asset: Asset
  /** Reference to the actual asset */
  assetId: Scalars["String"]
  /** A timestamp when the transaction was executed in unix time */
  executedAt: Scalars["Int"]
  /** A globally unique identifier for each transaction */
  id: Scalars["ID"]
  /** The market identifier code where the user intends to sell this asset */
  mic?: Maybe<Scalars["String"]>
  /** The portfolio of this transaction */
  portfolioId: Scalars["ID"]
  /** How much each share/item was bought/sold for */
  value: Scalars["Float"]
  /**
   * How many shares/items the user bought or sold
   * negative if sold
   */
  volume: Scalars["Float"]
}

/** Update only some values. */
export type UpdateSettings = {
  /** The user's default currency. Everything will be converted to this currency. */
  defaultCurrency?: Maybe<Scalars["String"]>
  /**
   * The user's default exchange. At the start only 1 exchange can be used.
   * This must be the MIC!
   */
  defaultExchange?: Maybe<Scalars["String"]>
  /** The unique user id */
  userId: Scalars["ID"]
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  portfolio?: Maybe<Portfolio>
  portfolios: Array<Portfolio>
  settings: Settings
  stripeCustomerId: Scalars["String"]
}

export type UserPortfolioArgs = {
  portfolioId: Scalars["ID"]
}

/**
 * Generic Value and Quantity over time.
 * This is used for assets for example.
 */
export type ValueAndQuantityAtTime = {
  __typename?: "ValueAndQuantityAtTime"
  /** How many shares/items */
  quantity: Scalars["Float"]
  /** A timestamp when this value and quantity was */
  time: Scalars["Int"]
  /** The value of each share/item */
  value: Scalars["Float"]
}

/** Anything that has a changing value over time can use this. */
export type ValueAtTime = {
  __typename?: "ValueAtTime"
  /** A unix timestamp. */
  time: Scalars["Int"]
  /** Can be anything really. Prices, percentages, or something else entirely. */
  value: Scalars["Float"]
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Asset: ResolversTypes["Company"] | ResolversTypes["Crypto"]
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  Company: ResolverTypeWrapper<Company>
  CreateSettings: CreateSettings
  Crypto: ResolverTypeWrapper<Crypto>
  Exchange: ResolverTypeWrapper<Exchange>
  ExchangeTradedAsset: ResolversTypes["Company"] | ResolversTypes["Crypto"]
  Float: ResolverTypeWrapper<Scalars["Float"]>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  Mutation: ResolverTypeWrapper<{}>
  Portfolio: ResolverTypeWrapper<PortfolioModel>
  Query: ResolverTypeWrapper<{}>
  Settings: ResolverTypeWrapper<Settings>
  Stock: ResolversTypes["Company"]
  String: ResolverTypeWrapper<Scalars["String"]>
  Transaction: ResolverTypeWrapper<Transaction>
  UpdateSettings: UpdateSettings
  User: ResolverTypeWrapper<UserModel>
  ValueAndQuantityAtTime: ResolverTypeWrapper<ValueAndQuantityAtTime>
  ValueAtTime: ResolverTypeWrapper<ValueAtTime>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Asset: ResolversParentTypes["Company"] | ResolversParentTypes["Crypto"]
  Boolean: Scalars["Boolean"]
  Company: Company
  CreateSettings: CreateSettings
  Crypto: Crypto
  Exchange: Exchange
  ExchangeTradedAsset: ResolversParentTypes["Company"] | ResolversParentTypes["Crypto"]
  Float: Scalars["Float"]
  ID: Scalars["ID"]
  Int: Scalars["Int"]
  Mutation: {}
  Portfolio: PortfolioModel
  Query: {}
  Settings: Settings
  Stock: ResolversParentTypes["Company"]
  String: Scalars["String"]
  Transaction: Transaction
  UpdateSettings: UpdateSettings
  User: UserModel
  ValueAndQuantityAtTime: ValueAndQuantityAtTime
  ValueAtTime: ValueAtTime
}>

export type AssetResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Asset"] = ResolversParentTypes["Asset"],
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Company" | "Crypto", ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
}>

export type CompanyResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Company"] = ResolversParentTypes["Company"],
> = ResolversObject<{
  assetHistory?: Resolver<
    Array<ResolversTypes["ValueAndQuantityAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<CompanyAssetHistoryArgs, "end" | "exchangeId" | "start">
  >
  country?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  figi?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  sector?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CryptoResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Crypto"] = ResolversParentTypes["Crypto"],
> = ResolversObject<{
  assetHistory?: Resolver<
    Array<ResolversTypes["ValueAndQuantityAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<CryptoAssetHistoryArgs, "end" | "exchangeId" | "start">
  >
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ExchangeResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Exchange"] = ResolversParentTypes["Exchange"],
> = ResolversObject<{
  abbreviation?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  mic?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  region?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  suffix?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ExchangeTradedAssetResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["ExchangeTradedAsset"] = ResolversParentTypes["ExchangeTradedAsset"],
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Company" | "Crypto", ParentType, ContextType>
  assetHistory?: Resolver<
    Array<ResolversTypes["ValueAndQuantityAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<ExchangeTradedAssetAssetHistoryArgs, "end" | "exchangeId" | "start">
  >
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>
  createSettings?: Resolver<
    ResolversTypes["Settings"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSettingsArgs, "settings">
  >
  updateSettings?: Resolver<
    ResolversTypes["Settings"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSettingsArgs, "settings">
  >
}>

export type PortfolioResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Portfolio"] = ResolversParentTypes["Portfolio"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  primary?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  transactions?: Resolver<Array<ResolversTypes["Transaction"]>, ParentType, ContextType>
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  exchanges?: Resolver<Array<ResolversTypes["Exchange"]>, ParentType, ContextType>
  healthCheck?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  portfolio?: Resolver<
    Maybe<ResolversTypes["Portfolio"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPortfolioArgs, "portfolioId">
  >
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "userId">
  >
}>

export type SettingsResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Settings"] = ResolversParentTypes["Settings"],
> = ResolversObject<{
  defaultCurrency?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  defaultExchange?: Resolver<ResolversTypes["Exchange"], ParentType, ContextType>
  defaultExchangeMic?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type StockResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Stock"] = ResolversParentTypes["Stock"],
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Company", ParentType, ContextType>
  assetHistory?: Resolver<
    Array<ResolversTypes["ValueAndQuantityAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<StockAssetHistoryArgs, "end" | "exchangeId" | "start">
  >
  country?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  figi?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
}>

export type TransactionResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Transaction"] = ResolversParentTypes["Transaction"],
> = ResolversObject<{
  asset?: Resolver<ResolversTypes["Asset"], ParentType, ContextType>
  assetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  executedAt?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  mic?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  portfolioId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  volume?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  portfolio?: Resolver<
    Maybe<ResolversTypes["Portfolio"]>,
    ParentType,
    ContextType,
    RequireFields<UserPortfolioArgs, "portfolioId">
  >
  portfolios?: Resolver<Array<ResolversTypes["Portfolio"]>, ParentType, ContextType>
  settings?: Resolver<ResolversTypes["Settings"], ParentType, ContextType>
  stripeCustomerId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ValueAndQuantityAtTimeResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["ValueAndQuantityAtTime"] = ResolversParentTypes["ValueAndQuantityAtTime"],
> = ResolversObject<{
  quantity?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  time?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ValueAtTimeResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["ValueAtTime"] = ResolversParentTypes["ValueAtTime"],
> = ResolversObject<{
  time?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type Resolvers<ContextType = GraphQLModules.Context> = ResolversObject<{
  Asset?: AssetResolvers<ContextType>
  Company?: CompanyResolvers<ContextType>
  Crypto?: CryptoResolvers<ContextType>
  Exchange?: ExchangeResolvers<ContextType>
  ExchangeTradedAsset?: ExchangeTradedAssetResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Portfolio?: PortfolioResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Settings?: SettingsResolvers<ContextType>
  Stock?: StockResolvers<ContextType>
  Transaction?: TransactionResolvers<ContextType>
  User?: UserResolvers<ContextType>
  ValueAndQuantityAtTime?: ValueAndQuantityAtTimeResolvers<ContextType>
  ValueAtTime?: ValueAtTimeResolvers<ContextType>
}>

export type PortfolioQueryVariables = Exact<{
  portfolioId: Scalars["ID"]
}>

export type PortfolioQuery = {
  __typename?: "Query"
  portfolio?:
    | {
        __typename: "Portfolio"
        id: string
        name: string
        primary: boolean
        transactions: Array<{
          __typename?: "Transaction"
          id: string
          executedAt: number
          value: number
          volume: number
          asset:
            | {
                __typename: "Company"
                ticker: string
                isin: string
                logo: string
                id: string
                name: string
              }
            | {
                __typename: "Crypto"
                ticker: string
                isin: string
                logo: string
                id: string
                name: string
              }
        }>
      }
    | null
    | undefined
}

export type GetUserPortfoliosQueryVariables = Exact<{
  userId: Scalars["ID"]
}>

export type GetUserPortfoliosQuery = {
  __typename?: "Query"
  user?:
    | {
        __typename?: "User"
        portfolios: Array<{ __typename?: "Portfolio"; name: string; id: string; primary: boolean }>
      }
    | null
    | undefined
}

export type UserQueryVariables = Exact<{
  userId: Scalars["ID"]
}>

export type UserQuery = {
  __typename?: "Query"
  user?:
    | {
        __typename: "User"
        id: string
        stripeCustomerId: string
        settings: {
          __typename: "Settings"
          defaultCurrency: string
          defaultExchange: {
            __typename: "Exchange"
            abbreviation: string
            suffix?: string | null | undefined
            mic: string
            name: string
            region: string
          }
        }
      }
    | null
    | undefined
}

export const PortfolioDocument = gql`
  query portfolio($portfolioId: ID!) {
    portfolio(portfolioId: $portfolioId) {
      __typename
      id
      name
      primary
      transactions {
        id
        asset {
          __typename
          id
          name
          ... on ExchangeTradedAsset {
            ticker
            isin
            logo
            ... on Stock {
              __typename
            }
            ... on Crypto {
              __typename
            }
          }
        }
        executedAt
        value
        volume
      }
    }
  }
`
export const GetUserPortfoliosDocument = gql`
  query getUserPortfolios($userId: ID!) {
    user(userId: $userId) {
      portfolios {
        name
        id
        primary
      }
    }
  }
`
export const UserDocument = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      __typename
      id
      stripeCustomerId
      settings {
        __typename
        defaultCurrency
        defaultExchange {
          __typename
          abbreviation
          suffix
          mic
          name
          region
        }
      }
    }
  }
`
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    portfolio(variables: PortfolioQueryVariables, options?: C): Promise<PortfolioQuery> {
      return requester<PortfolioQuery, PortfolioQueryVariables>(
        PortfolioDocument,
        variables,
        options,
      )
    },
    getUserPortfolios(
      variables: GetUserPortfoliosQueryVariables,
      options?: C,
    ): Promise<GetUserPortfoliosQuery> {
      return requester<GetUserPortfoliosQuery, GetUserPortfoliosQueryVariables>(
        GetUserPortfoliosDocument,
        variables,
        options,
      )
    },
    user(variables: UserQueryVariables, options?: C): Promise<UserQuery> {
      return requester<UserQuery, UserQueryVariables>(UserDocument, variables, options)
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
