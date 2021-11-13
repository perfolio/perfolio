import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"
import { DocumentNode } from "graphql"
import gql from "graphql-tag"
export type Maybe<T> = T | undefined
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
  /** A unix timestamp with second precision */
  Timestamp: any
}

/** Access scope */
export enum Access {
  /** Only the createor and shared users have access */
  Private = "PRIVATE",
  /** Everyone has access */
  Public = "PUBLIC",
}

/** Common fields on all assets */
export type Asset = {
  /** Globally unique id */
  id: Scalars["ID"]
  /** Human readable name */
  name: Scalars["String"]
}

/** The value and volume of an asset over time. */
export type AssetHistory = {
  __typename?: "AssetHistory"
  /** The asset */
  asset: ExchangeTradedAsset
  /** For reference */
  assetId: Scalars["String"]
  /** Value and Quantity for each day */
  history: Array<ValueAndQuantityAtTime>
}

/** Stocks such as company shares and funds. */
export type CompanyStock = Asset &
  ExchangeTradedAsset & {
    __typename?: "CompanyStock"
    /** The country where this company is registered */
    country: Scalars["String"]
    /** For stocks we are always using the isin as id. */
    id: Scalars["ID"]
    /** International Securities Indentification Number */
    isin: Scalars["String"]
    /** The companys logo url */
    logo: Scalars["String"]
    /** The companys name */
    name: Scalars["String"]
    /** The main sector of this company */
    sector: Scalars["String"]
    /** The ticker of a stock. This does not include pre/suffixes for different exchanges */
    ticker: Scalars["String"]
  }

export type CreatePortfolio = {
  /**
   * Public portfolios can be seen by anyone with the portfolio id
   * Private portfolios are only visible to the owner and users who were
   * granted access.
   */
  access?: Maybe<Access>
  /** Ids of users who have read access for this portfolio */
  grantReadAccess?: Maybe<Array<Scalars["ID"]>>
  /** unique id */
  id: Scalars["ID"]
  /** Human readable name for the portfolio */
  name: Scalars["String"]
  /** The primary portfolio will be displayed by default */
  primary?: Maybe<Scalars["Boolean"]>
  /** Associated transactions */
  transactions?: Maybe<Array<CreateTransaction>>
  /** The owner of this portfolio */
  userId: Scalars["ID"]
}

/** Create a new user settings object when a new user signs up */
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

/** Create a new transaction */
export type CreateTransaction = {
  /** The asset id identifies the asset, this will be prefixed by 'stock_' for stocks */
  assetId: Scalars["ID"]
  /** A timestamp when the transaction was executed */
  executedAt: Scalars["Timestamp"]
  /** The market identifier code where the user intends to sell this asset */
  mic?: Maybe<Scalars["String"]>
  /** The portfolio of this transaction */
  portfolioId: Scalars["ID"]
  /** How much each share/item was bought/sold for */
  value: Scalars["Float"]
  /** How many shares/items the user bought or sold */
  volume: Scalars["Float"]
}

/** Crypto */
export type Crypto = Asset &
  ExchangeTradedAsset & {
    __typename?: "Crypto"
    /** A globally unique id */
    id: Scalars["ID"]
    /** B */
    logo: Scalars["String"]
    /** Dummy field */
    name: Scalars["String"]
    /** A */
    ticker: Scalars["String"]
  }

/** An exchange where shares are traded */
export type Exchange = {
  __typename?: "Exchange"
  /** Exchange abbreviation */
  abbreviation: Scalars["String"]
  /** Market Identifier Code using ISO 10383 */
  mic: Scalars["String"]
  /** Full name of the exchange. */
  name: Scalars["String"]
  /** 2 letter case insensitive string of country codes using ISO 3166-1 alpha-2 */
  region: Scalars["String"]
  /** Exchange Suffix to be added for symbols on that exchange */
  suffix?: Maybe<Scalars["String"]>
}

/** A sub type of assets that are all traded at exchanges */
export type ExchangeTradedAsset = {
  /** A globally unique id */
  id: Scalars["ID"]
  /** URL to the logo or image */
  logo: Scalars["String"]
  /** Human readable name */
  name: Scalars["String"]
  /** The ticker as used by the exchanges. */
  ticker: Scalars["String"]
}

/** The interval for timeseries */
export enum Interval {
  /** One rate per year */
  Annual = "ANNUAL",
  /** One rate per day */
  Daily = "DAILY",
  /** One rate per month */
  Monthly = "MONTHLY",
}

/** Available mutations */
export type Mutation = {
  __typename?: "Mutation"
  /** Create a new portfolio */
  createPortfolio: Portfolio
  /** Create and store settings for the first time. For example when a new user signs up. */
  createSettings: Settings
  /** Create a new transaction */
  createTransaction?: Maybe<Transaction>
  /** Delete a single transaction from the database */
  deleteTransaction: Scalars["ID"]
  /** Enter the user's email into our newsletter list. */
  subscribeToNewsletter: Scalars["String"]
  /** Only update some values in the user settings. */
  updateSettings: Settings
}

/** Available mutations */
export type MutationCreatePortfolioArgs = {
  portfolio: CreatePortfolio
}

/** Available mutations */
export type MutationCreateSettingsArgs = {
  settings: CreateSettings
}

/** Available mutations */
export type MutationCreateTransactionArgs = {
  transaction: CreateTransaction
}

/** Available mutations */
export type MutationDeleteTransactionArgs = {
  transactionId: Scalars["ID"]
}

/** Available mutations */
export type MutationSubscribeToNewsletterArgs = {
  email: Scalars["String"]
}

/** Available mutations */
export type MutationUpdateSettingsArgs = {
  settings: UpdateSettings
}

export type Portfolio = {
  __typename?: "Portfolio"
  /** Return all assets over time for a given user */
  absoluteHistory: Array<AssetHistory>
  /** unique id */
  id: Scalars["ID"]
  /** Human readable name for the portfolio */
  name: Scalars["String"]
  /** The primary portfolio will be displayed by default */
  primary: Scalars["Boolean"]
  /** Return an index for the performance of the users portfolio */
  relativeHistory: Array<ValueAtTime>
  /** Associated transactions */
  transactions: Array<Transaction>
  /** The owner of this portfolio */
  user: User
}

export type PortfolioRelativeHistoryArgs = {
  since?: Maybe<Scalars["Int"]>
}

/** Available queries */
export type Query = {
  __typename?: "Query"
  /** Load an exchange traded asset by its id */
  exchangeTradedAsset?: Maybe<ExchangeTradedAsset>
  /** Get a list of all availale exchanges */
  exchanges: Array<Exchange>
  /** Return a portfolio by its id */
  portfolio?: Maybe<Portfolio>
  /** Get the risk free rates for a given interval */
  riskFreeRates: Array<ValueAtTime>
  /**
   * Return matching isins for a given search string
   *
   * The fragment will be compared against the ticker and company name.
   */
  search: Array<SearchResult>
  /** Return the daily closing prices for a stock at a specific exchange */
  stockPricesAtExchange: Array<ValueAtTime>
  /** Load a user by their id */
  user?: Maybe<User>
}

/** Available queries */
export type QueryExchangeTradedAssetArgs = {
  id: Scalars["ID"]
}

/** Available queries */
export type QueryPortfolioArgs = {
  portfolioId: Scalars["ID"]
}

/** Available queries */
export type QueryRiskFreeRatesArgs = {
  begin: Scalars["Timestamp"]
  end?: Maybe<Scalars["Timestamp"]>
  interval: Interval
}

/** Available queries */
export type QuerySearchArgs = {
  fragment: Scalars["String"]
}

/** Available queries */
export type QueryStockPricesAtExchangeArgs = {
  end?: Maybe<Scalars["Timestamp"]>
  mic: Scalars["String"]
  start: Scalars["Timestamp"]
  ticker: Scalars["String"]
}

/** Available queries */
export type QueryUserArgs = {
  userId: Scalars["ID"]
}

/** The found company from a user search. */
export type SearchResult = {
  __typename?: "SearchResult"
  /** All company data itself */
  asset: ExchangeTradedAsset
  /** For reference */
  assetId: Scalars["String"]
  /** The isin of the company */
  isin: Scalars["ID"]
  /** The ticker of the company */
  ticker: Scalars["ID"]
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

/** A transactions represents a single purchase or sale of any number of shares of a single asset. */
export type Transaction = {
  __typename?: "Transaction"
  /** The of asset. Stocks, Crypto, Real estate for example. */
  asset: ExchangeTradedAsset
  /** Reference to the actual asset */
  assetId: Scalars["String"]
  /** A timestamp when the transaction was executed */
  executedAt: Scalars["Timestamp"]
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
   *
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

/** A user of perfol.io */
export type User = {
  __typename?: "User"
  /** The user's email */
  email: Scalars["String"]
  /** A unique identifier: stored as uuid */
  id: Scalars["ID"]
  portfolios: Array<Portfolio>
  /** The user's settings */
  settings?: Maybe<Settings>
  /** Stripe customer id */
  stripeCustomerId: Scalars["ID"]
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
  time: Scalars["Timestamp"]
  /** The value of each share/item */
  value: Scalars["Float"]
}

/** Anything that has a changing value over time can use this. */
export type ValueAtTime = {
  __typename?: "ValueAtTime"
  /** A unix timestamp. */
  time: Scalars["Timestamp"]
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
  Access: Access
  Asset: ResolversTypes["CompanyStock"] | ResolversTypes["Crypto"]
  AssetHistory: ResolverTypeWrapper<AssetHistory>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  CompanyStock: ResolverTypeWrapper<CompanyStock>
  CreatePortfolio: CreatePortfolio
  CreateSettings: CreateSettings
  CreateTransaction: CreateTransaction
  Crypto: ResolverTypeWrapper<Crypto>
  Exchange: ResolverTypeWrapper<Exchange>
  ExchangeTradedAsset: ResolversTypes["CompanyStock"] | ResolversTypes["Crypto"]
  Float: ResolverTypeWrapper<Scalars["Float"]>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  Interval: Interval
  Mutation: ResolverTypeWrapper<{}>
  Portfolio: ResolverTypeWrapper<Portfolio>
  Query: ResolverTypeWrapper<{}>
  SearchResult: ResolverTypeWrapper<SearchResult>
  Settings: ResolverTypeWrapper<Settings>
  String: ResolverTypeWrapper<Scalars["String"]>
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>
  Transaction: ResolverTypeWrapper<Transaction>
  UpdateSettings: UpdateSettings
  User: ResolverTypeWrapper<User>
  ValueAndQuantityAtTime: ResolverTypeWrapper<ValueAndQuantityAtTime>
  ValueAtTime: ResolverTypeWrapper<ValueAtTime>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Asset: ResolversParentTypes["CompanyStock"] | ResolversParentTypes["Crypto"]
  AssetHistory: AssetHistory
  Boolean: Scalars["Boolean"]
  CompanyStock: CompanyStock
  CreatePortfolio: CreatePortfolio
  CreateSettings: CreateSettings
  CreateTransaction: CreateTransaction
  Crypto: Crypto
  Exchange: Exchange
  ExchangeTradedAsset: ResolversParentTypes["CompanyStock"] | ResolversParentTypes["Crypto"]
  Float: Scalars["Float"]
  ID: Scalars["ID"]
  Int: Scalars["Int"]
  Mutation: {}
  Portfolio: Portfolio
  Query: {}
  SearchResult: SearchResult
  Settings: Settings
  String: Scalars["String"]
  Timestamp: Scalars["Timestamp"]
  Transaction: Transaction
  UpdateSettings: UpdateSettings
  User: User
  ValueAndQuantityAtTime: ValueAndQuantityAtTime
  ValueAtTime: ValueAtTime
}>

export type AssetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Asset"] = ResolversParentTypes["Asset"],
> = ResolversObject<{
  __resolveType: TypeResolveFn<"CompanyStock" | "Crypto", ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
}>

export type AssetHistoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AssetHistory"] = ResolversParentTypes["AssetHistory"],
> = ResolversObject<{
  asset?: Resolver<ResolversTypes["ExchangeTradedAsset"], ParentType, ContextType>
  assetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  history?: Resolver<Array<ResolversTypes["ValueAndQuantityAtTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CompanyStockResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CompanyStock"] = ResolversParentTypes["CompanyStock"],
> = ResolversObject<{
  country?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  sector?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CryptoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Crypto"] = ResolversParentTypes["Crypto"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ExchangeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Exchange"] = ResolversParentTypes["Exchange"],
> = ResolversObject<{
  abbreviation?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  mic?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  region?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  suffix?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ExchangeTradedAssetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ExchangeTradedAsset"] = ResolversParentTypes["ExchangeTradedAsset"],
> = ResolversObject<{
  __resolveType: TypeResolveFn<"CompanyStock" | "Crypto", ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = ResolversObject<{
  createPortfolio?: Resolver<
    ResolversTypes["Portfolio"],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePortfolioArgs, "portfolio">
  >
  createSettings?: Resolver<
    ResolversTypes["Settings"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSettingsArgs, "settings">
  >
  createTransaction?: Resolver<
    Maybe<ResolversTypes["Transaction"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTransactionArgs, "transaction">
  >
  deleteTransaction?: Resolver<
    ResolversTypes["ID"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTransactionArgs, "transactionId">
  >
  subscribeToNewsletter?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<MutationSubscribeToNewsletterArgs, "email">
  >
  updateSettings?: Resolver<
    ResolversTypes["Settings"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSettingsArgs, "settings">
  >
}>

export type PortfolioResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Portfolio"] = ResolversParentTypes["Portfolio"],
> = ResolversObject<{
  absoluteHistory?: Resolver<Array<ResolversTypes["AssetHistory"]>, ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  primary?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  relativeHistory?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<PortfolioRelativeHistoryArgs, never>
  >
  transactions?: Resolver<Array<ResolversTypes["Transaction"]>, ParentType, ContextType>
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  exchangeTradedAsset?: Resolver<
    Maybe<ResolversTypes["ExchangeTradedAsset"]>,
    ParentType,
    ContextType,
    RequireFields<QueryExchangeTradedAssetArgs, "id">
  >
  exchanges?: Resolver<Array<ResolversTypes["Exchange"]>, ParentType, ContextType>
  portfolio?: Resolver<
    Maybe<ResolversTypes["Portfolio"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPortfolioArgs, "portfolioId">
  >
  riskFreeRates?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<QueryRiskFreeRatesArgs, "begin" | "interval">
  >
  search?: Resolver<
    Array<ResolversTypes["SearchResult"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchArgs, "fragment">
  >
  stockPricesAtExchange?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<QueryStockPricesAtExchangeArgs, "mic" | "start" | "ticker">
  >
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "userId">
  >
}>

export type SearchResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SearchResult"] = ResolversParentTypes["SearchResult"],
> = ResolversObject<{
  asset?: Resolver<ResolversTypes["ExchangeTradedAsset"], ParentType, ContextType>
  assetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type SettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Settings"] = ResolversParentTypes["Settings"],
> = ResolversObject<{
  defaultCurrency?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  defaultExchange?: Resolver<ResolversTypes["Exchange"], ParentType, ContextType>
  defaultExchangeMic?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export interface TimestampScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Timestamp"], any> {
  name: "Timestamp"
}

export type TransactionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Transaction"] = ResolversParentTypes["Transaction"],
> = ResolversObject<{
  asset?: Resolver<ResolversTypes["ExchangeTradedAsset"], ParentType, ContextType>
  assetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  executedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  mic?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  portfolioId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  volume?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  portfolios?: Resolver<Array<ResolversTypes["Portfolio"]>, ParentType, ContextType>
  settings?: Resolver<Maybe<ResolversTypes["Settings"]>, ParentType, ContextType>
  stripeCustomerId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ValueAndQuantityAtTimeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ValueAndQuantityAtTime"] = ResolversParentTypes["ValueAndQuantityAtTime"],
> = ResolversObject<{
  quantity?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  time?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ValueAtTimeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ValueAtTime"] = ResolversParentTypes["ValueAtTime"],
> = ResolversObject<{
  time?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type Resolvers<ContextType = any> = ResolversObject<{
  Asset?: AssetResolvers<ContextType>
  AssetHistory?: AssetHistoryResolvers<ContextType>
  CompanyStock?: CompanyStockResolvers<ContextType>
  Crypto?: CryptoResolvers<ContextType>
  Exchange?: ExchangeResolvers<ContextType>
  ExchangeTradedAsset?: ExchangeTradedAssetResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Portfolio?: PortfolioResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  SearchResult?: SearchResultResolvers<ContextType>
  Settings?: SettingsResolvers<ContextType>
  Timestamp?: GraphQLScalarType
  Transaction?: TransactionResolvers<ContextType>
  User?: UserResolvers<ContextType>
  ValueAndQuantityAtTime?: ValueAndQuantityAtTimeResolvers<ContextType>
  ValueAtTime?: ValueAtTimeResolvers<ContextType>
}>

export type TransactionSchemaFragment = {
  __typename?: "Transaction"
  id: string
  assetId: string
  executedAt: any
  value: number
  volume: number
  portfolioId: string
}

export type CreatePortfolioMutationVariables = Exact<{
  portfolio: CreatePortfolio
}>

export type CreatePortfolioMutation = {
  __typename?: "Mutation"
  createPortfolio: { __typename?: "Portfolio"; id: string }
}

export type CreateTransactionMutationVariables = Exact<{
  transaction: CreateTransaction
}>

export type CreateTransactionMutation = {
  __typename?: "Mutation"
  createTransaction?: { __typename?: "Transaction"; id: string } | null | undefined
}

export type CreateSettingsMutationVariables = Exact<{
  settings: CreateSettings
}>

export type CreateSettingsMutation = {
  __typename?: "Mutation"
  createSettings: {
    __typename?: "Settings"
    defaultCurrency: string
    defaultExchange: { __typename?: "Exchange"; mic: string }
  }
}

export type DeleteTransactionMutationVariables = Exact<{
  transactionId: Scalars["ID"]
}>

export type DeleteTransactionMutation = { __typename?: "Mutation"; deleteTransaction: string }

export type SubscribeToNewsletterMutationMutationVariables = Exact<{
  email: Scalars["String"]
}>

export type SubscribeToNewsletterMutationMutation = {
  __typename?: "Mutation"
  subscribeToNewsletter: string
}

export type UpdateSettingsMutationVariables = Exact<{
  settings: UpdateSettings
}>

export type UpdateSettingsMutation = {
  __typename?: "Mutation"
  updateSettings: {
    __typename?: "Settings"
    defaultCurrency: string
    defaultExchange: { __typename?: "Exchange"; mic: string }
  }
}

export type ExchangeTradedAssetQueryVariables = Exact<{
  id: Scalars["ID"]
}>

export type ExchangeTradedAssetQuery = {
  __typename?: "Query"
  exchangeTradedAsset?:
    | { __typename: "CompanyStock"; id: string; ticker: string; logo: string; name: string }
    | { __typename: "Crypto"; id: string; ticker: string; logo: string; name: string }
    | null
    | undefined
}

export type ExchangesQueryVariables = Exact<{ [key: string]: never }>

export type ExchangesQuery = {
  __typename?: "Query"
  exchanges: Array<{
    __typename: "Exchange"
    name: string
    region: string
    mic: string
    suffix?: string | null | undefined
    abbreviation: string
  }>
}

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
          portfolioId: string
          executedAt: any
          value: number
          volume: number
          asset:
            | { __typename: "CompanyStock"; id: string; ticker: string; logo: string; name: string }
            | { __typename: "Crypto"; id: string; ticker: string; logo: string; name: string }
        }>
      }
    | null
    | undefined
}

export type PortfolioHistoryQueryVariables = Exact<{
  portfolioId: Scalars["ID"]
}>

export type PortfolioHistoryQuery = {
  __typename?: "Query"
  portfolio?:
    | {
        __typename?: "Portfolio"
        absoluteHistory: Array<{
          __typename?: "AssetHistory"
          assetId: string
          asset:
            | {
                __typename: "CompanyStock"
                sector: string
                country: string
                id: string
                ticker: string
                name: string
                logo: string
              }
            | { __typename: "Crypto"; id: string; ticker: string; name: string; logo: string }
          history: Array<{
            __typename?: "ValueAndQuantityAtTime"
            value: number
            time: any
            quantity: number
          }>
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

export type RelativePortfolioHistoryQueryVariables = Exact<{
  portfolioId: Scalars["ID"]
  since?: Maybe<Scalars["Int"]>
}>

export type RelativePortfolioHistoryQuery = {
  __typename?: "Query"
  portfolio?:
    | {
        __typename?: "Portfolio"
        relativeHistory: Array<{ __typename?: "ValueAtTime"; time: any; value: number }>
      }
    | null
    | undefined
}

export type SearchQueryVariables = Exact<{
  fragment: Scalars["String"]
}>

export type SearchQuery = {
  __typename?: "Query"
  search: Array<{
    __typename: "SearchResult"
    isin: string
    asset:
      | { __typename: "CompanyStock"; logo: string; ticker: string; name: string }
      | { __typename: "Crypto"; logo: string; ticker: string; name: string }
  }>
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
        email: string
        stripeCustomerId: string
        settings?:
          | {
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
          | null
          | undefined
      }
    | null
    | undefined
}

export const TransactionSchemaFragmentDoc = gql`
  fragment TransactionSchema on Transaction {
    id
    assetId
    executedAt
    value
    volume
    portfolioId
  }
`
export const CreatePortfolioDocument = gql`
  mutation createPortfolio($portfolio: CreatePortfolio!) {
    createPortfolio(portfolio: $portfolio) {
      id
    }
  }
`
export const CreateTransactionDocument = gql`
  mutation createTransaction($transaction: CreateTransaction!) {
    createTransaction(transaction: $transaction) {
      id
    }
  }
`
export const CreateSettingsDocument = gql`
  mutation createSettings($settings: CreateSettings!) {
    createSettings(settings: $settings) {
      defaultCurrency
      defaultExchange {
        mic
      }
    }
  }
`
export const DeleteTransactionDocument = gql`
  mutation deleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId)
  }
`
export const SubscribeToNewsletterMutationDocument = gql`
  mutation subscribeToNewsletterMutation($email: String!) {
    subscribeToNewsletter(email: $email)
  }
`
export const UpdateSettingsDocument = gql`
  mutation updateSettings($settings: UpdateSettings!) {
    updateSettings(settings: $settings) {
      defaultCurrency
      defaultExchange {
        mic
      }
    }
  }
`
export const ExchangeTradedAssetDocument = gql`
  query exchangeTradedAsset($id: ID!) {
    exchangeTradedAsset(id: $id) {
      __typename
      id
      ticker
      logo
      name
    }
  }
`
export const ExchangesDocument = gql`
  query exchanges {
    exchanges {
      __typename
      name
      region
      mic
      suffix
      abbreviation
    }
  }
`
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
          ticker
          logo
          name
          ... on CompanyStock {
            __typename
          }
          ... on Crypto {
            __typename
          }
        }
        portfolioId
        executedAt
        value
        volume
      }
    }
  }
`
export const PortfolioHistoryDocument = gql`
  query portfolioHistory($portfolioId: ID!) {
    portfolio(portfolioId: $portfolioId) {
      absoluteHistory {
        assetId
        asset {
          id
          ticker
          name
          logo
          ... on CompanyStock {
            __typename
            sector
            country
          }
          ... on Crypto {
            __typename
          }
        }
        history {
          value
          time
          quantity
        }
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
export const RelativePortfolioHistoryDocument = gql`
  query relativePortfolioHistory($portfolioId: ID!, $since: Int) {
    portfolio(portfolioId: $portfolioId) {
      relativeHistory(since: $since) {
        time
        value
      }
    }
  }
`
export const SearchDocument = gql`
  query search($fragment: String!) {
    search(fragment: $fragment) {
      __typename
      isin
      asset {
        __typename
        logo
        ticker
        name
      }
    }
  }
`
export const UserDocument = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      __typename
      id
      email
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
    createPortfolio(
      variables: CreatePortfolioMutationVariables,
      options?: C,
    ): Promise<CreatePortfolioMutation> {
      return requester<CreatePortfolioMutation, CreatePortfolioMutationVariables>(
        CreatePortfolioDocument,
        variables,
        options,
      )
    },
    createTransaction(
      variables: CreateTransactionMutationVariables,
      options?: C,
    ): Promise<CreateTransactionMutation> {
      return requester<CreateTransactionMutation, CreateTransactionMutationVariables>(
        CreateTransactionDocument,
        variables,
        options,
      )
    },
    createSettings(
      variables: CreateSettingsMutationVariables,
      options?: C,
    ): Promise<CreateSettingsMutation> {
      return requester<CreateSettingsMutation, CreateSettingsMutationVariables>(
        CreateSettingsDocument,
        variables,
        options,
      )
    },
    deleteTransaction(
      variables: DeleteTransactionMutationVariables,
      options?: C,
    ): Promise<DeleteTransactionMutation> {
      return requester<DeleteTransactionMutation, DeleteTransactionMutationVariables>(
        DeleteTransactionDocument,
        variables,
        options,
      )
    },
    subscribeToNewsletterMutation(
      variables: SubscribeToNewsletterMutationMutationVariables,
      options?: C,
    ): Promise<SubscribeToNewsletterMutationMutation> {
      return requester<
        SubscribeToNewsletterMutationMutation,
        SubscribeToNewsletterMutationMutationVariables
      >(SubscribeToNewsletterMutationDocument, variables, options)
    },
    updateSettings(
      variables: UpdateSettingsMutationVariables,
      options?: C,
    ): Promise<UpdateSettingsMutation> {
      return requester<UpdateSettingsMutation, UpdateSettingsMutationVariables>(
        UpdateSettingsDocument,
        variables,
        options,
      )
    },
    exchangeTradedAsset(
      variables: ExchangeTradedAssetQueryVariables,
      options?: C,
    ): Promise<ExchangeTradedAssetQuery> {
      return requester<ExchangeTradedAssetQuery, ExchangeTradedAssetQueryVariables>(
        ExchangeTradedAssetDocument,
        variables,
        options,
      )
    },
    exchanges(variables?: ExchangesQueryVariables, options?: C): Promise<ExchangesQuery> {
      return requester<ExchangesQuery, ExchangesQueryVariables>(
        ExchangesDocument,
        variables,
        options,
      )
    },
    portfolio(variables: PortfolioQueryVariables, options?: C): Promise<PortfolioQuery> {
      return requester<PortfolioQuery, PortfolioQueryVariables>(
        PortfolioDocument,
        variables,
        options,
      )
    },
    portfolioHistory(
      variables: PortfolioHistoryQueryVariables,
      options?: C,
    ): Promise<PortfolioHistoryQuery> {
      return requester<PortfolioHistoryQuery, PortfolioHistoryQueryVariables>(
        PortfolioHistoryDocument,
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
    relativePortfolioHistory(
      variables: RelativePortfolioHistoryQueryVariables,
      options?: C,
    ): Promise<RelativePortfolioHistoryQuery> {
      return requester<RelativePortfolioHistoryQuery, RelativePortfolioHistoryQueryVariables>(
        RelativePortfolioHistoryDocument,
        variables,
        options,
      )
    },
    search(variables: SearchQueryVariables, options?: C): Promise<SearchQuery> {
      return requester<SearchQuery, SearchQueryVariables>(SearchDocument, variables, options)
    },
    user(variables: UserQueryVariables, options?: C): Promise<UserQuery> {
      return requester<UserQuery, UserQueryVariables>(UserDocument, variables, options)
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
