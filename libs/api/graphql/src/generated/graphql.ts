import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"
import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
const defaultOptions = {}
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

/** The value and volume of an asset over time. */
export type AssetHistory = {
  __typename?: "AssetHistory"
  /** The unique asset id */
  assetId: Scalars["ID"]
  /** Value and Quantity for each day */
  history: Array<ValueAndQuantityAtTime>
}

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

/** A publicly traded company */
export type Company = {
  __typename?: "Company"
  /** Street address of the company if available */
  address?: Maybe<Scalars["String"]>
  /** Street address of the company if available */
  address2?: Maybe<Scalars["String"]>
  /** Name of the CEO of the company */
  ceo?: Maybe<Scalars["String"]>
  /** City of the company if available */
  city?: Maybe<Scalars["String"]>
  /** Country of the company if available */
  country?: Maybe<Scalars["String"]>
  /**
   * Return the latest price
   * Computed value
   */
  currentValue: Scalars["Float"]
  /** Description for the company */
  description?: Maybe<Scalars["String"]>
  /** Number of employees */
  employees?: Maybe<Scalars["Int"]>
  /**
   * Refers to Exchange using IEX Supported Exchanges list
   * @see https://cloud.iexapis.com/stable/ref-data/exchanges
   */
  exchange?: Maybe<Exchange>
  /** Refers to the industry the company belongs to */
  industry?: Maybe<Scalars["String"]>
  /** Refers to the common issue type of the stock. */
  issueType?: Maybe<IssueType>
  /** Url of the logo */
  logo?: Maybe<Scalars["String"]>
  /** Name of the company */
  name?: Maybe<Scalars["String"]>
  /** Phone Number of the company if available */
  phone?: Maybe<Scalars["String"]>
  /**
   * Primary SIC Code for the ticker (if available)
   * @see https://en.wikipedia.org/wiki/Standard_Industrial_Classification
   */
  primarySicCode?: Maybe<Scalars["Int"]>
  /** Refers to the sector the company belongs to. */
  sector?: Maybe<Scalars["String"]>
  /** Name of the CEO of the company */
  securityName?: Maybe<Scalars["String"]>
  /** State of the company if available */
  state?: Maybe<Scalars["String"]>
  /** An array of Strings used to classify the company. */
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>
  /** Ticker of the company */
  ticker: Scalars["String"]
  /** Website of the company */
  website?: Maybe<Scalars["String"]>
  /** Zip code of the company if available */
  zip?: Maybe<Scalars["String"]>
}

/** Create a new transaction */
export type CreateTransaction = {
  /** The asset id identifies the asset, this will be prefixed by 'stock_' for stocks */
  assetId: Scalars["ID"]
  /** A timestamp when the transaction was executed */
  executedAt: Scalars["Timestamp"]
  /** The user's unique id */
  userId: Scalars["ID"]
  /** How much each share/item was bought/sold for */
  value: Scalars["Float"]
  /** How many shares/items the user bought or sold */
  volume: Scalars["Float"]
}

/** Create a new user settings object when a new user signs up */
export type CreateUserSettings = {
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

/** An exchange where shares are traded */
export type Exchange = {
  __typename?: "Exchange"
  /** Exchange abbreviation */
  abbreviation: Scalars["String"]
  /** Exchange Suffix to be added for symbols on that exchange */
  suffix: Scalars["String"]
  /** Market Identifier Code using ISO 10383 */
  mic: Scalars["String"]
  /** Full name of the exchange. */
  name: Scalars["String"]
  /** 2 letter case insensitive string of country codes using ISO 3166-1 alpha-2 */
  region: Scalars["String"]
}

/** The interval for timeseries */
export enum Interval {
  /** One rate per day */
  Daily = "DAILY",
  /** One rate per month */
  Monthly = "MONTHLY",
  /** One rate per year */
  Annual = "ANNUAL",
}

/** Issue types for stock assets */
export enum IssueType {
  /** ADR */
  Ad = "AD",
  /** Closed End Fund */
  Cef = "CEF",
  /** Common Stock */
  Cs = "CS",
  /** Other */
  Empty = "EMPTY",
  /** ETF */
  Et = "ET",
  /** Open Ended Fund */
  Oef = "OEF",
  /** Preferred Stock */
  Ps = "PS",
  /** Right */
  Rt = "RT",
  /** Structured Product */
  Struct = "STRUCT",
  /** Unit */
  Ut = "UT",
  /** When Issued */
  Wi = "WI",
  /** Warrant */
  Wt = "WT",
}

/** Available mutations */
export type Mutation = {
  __typename?: "Mutation"
  /** Create a new transaction */
  createTransaction: Transaction
  /** Create and store settings for the first time. For example when a new user signs up. */
  createUserSettings: UserSettings
  /** Delete a single transaction from the database */
  deleteTransaction?: Maybe<Transaction>
  /** Enter the user's email into our newsletter list. */
  subscribeToNewsletter?: Maybe<Scalars["String"]>
  /** Only update some values in the user settings. */
  updateUserSettings: UserSettings
}

/** Available mutations */
export type MutationCreateTransactionArgs = {
  transaction: CreateTransaction
}

/** Available mutations */
export type MutationCreateUserSettingsArgs = {
  userSettings: CreateUserSettings
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
export type MutationUpdateUserSettingsArgs = {
  userSettings: UpdateUserSettings
}

/** The users assets over time derived from their transactions */
export type PortfolioHistory = {
  __typename?: "PortfolioHistory"
  /** All assets from the beginning of the portfolio until now. */
  assets: Array<AssetHistory>
}

/** Available queries */
export type Query = {
  __typename?: "Query"
  /** Return a list of all companies that can be traded at a certain exchange */
  getAvailableCompaniesAtExchange: Array<Company>
  /** Return a company by its symbol */
  getCompany?: Maybe<Company>
  /** Get a list of all availale exchanges */
  getExchanges: Array<Exchange>
  /** Return all assets over time for a given user */
  getPortfolioHistory: PortfolioHistory
  /** Get the risk free rates for a given interval */
  getRiskFreeRates: Array<RiskFreeRate>
  /** Return data about a symbol */
  getTicker?: Maybe<Ticker>
  /** Return all transactions of a user */
  getTransactions: Array<Transaction>
  /** Return the user's settings */
  getUserSettings?: Maybe<UserSettings>
  /**
   * Return matching tickers for a given search string
   *
   * The companies will be loaded with a separate query to allow better caching
   */
  searchCompanies: Array<Maybe<Ticker>>
}

/** Available queries */
export type QueryGetAvailableCompaniesAtExchangeArgs = {
  mic: Scalars["String"]
}

/** Available queries */
export type QueryGetCompanyArgs = {
  ticker: Scalars["String"]
}

/** Available queries */
export type QueryGetPortfolioHistoryArgs = {
  userId: Scalars["String"]
}

/** Available queries */
export type QueryGetRiskFreeRatesArgs = {
  interval: Interval
  begin: Scalars["Timestamp"]
  end?: Maybe<Scalars["Timestamp"]>
}

/** Available queries */
export type QueryGetTickerArgs = {
  ticker: Scalars["String"]
}

/** Available queries */
export type QueryGetTransactionsArgs = {
  userId: Scalars["ID"]
}

/** Available queries */
export type QueryGetUserSettingsArgs = {
  userId: Scalars["ID"]
}

/** Available queries */
export type QuerySearchCompaniesArgs = {
  fragment: Scalars["String"]
  mic: Scalars["String"]
}

/**
 * The risk free rate from the european central bank
 *
 * This was meant to be a map with a time as key and the rate as value
 * but graphql does not handle maps.
 */
export type RiskFreeRate = {
  __typename?: "RiskFreeRate"
  /** Rate */
  rate: Scalars["Float"]
  /** Timestamp of a specific day */
  time: Scalars["Timestamp"]
}

/** A symbol as used by IEX */
export type Ticker = {
  __typename?: "Ticker"
  /** Refers to the currency the symbol is traded in */
  currency?: Maybe<Scalars["String"]>
  /** Refers to Exchange using IEX Supported Exchanges list */
  exchange?: Maybe<Exchange>
  /** The figi associated with this symbol */
  figi?: Maybe<Scalars["String"]>
  /** Refers to the name of the company or security. */
  name?: Maybe<Scalars["String"]>
  /** Refers to the region of the world the symbol is in */
  region?: Maybe<Scalars["String"]>
  /** Refers to the symbol */
  ticker: Scalars["String"]
  /** Refers to the common issue type */
  type?: Maybe<IssueType>
  /** Loads the company assiciated with this ticker" */
  company?: Maybe<Company>
}

/** A transactions represents a single purchase or sale of any number of shares of a single asset. */
export type Transaction = {
  __typename?: "Transaction"
  /** The asset id identifies the asset, this will be prefixed by 'stock_' for stocks */
  assetId: Scalars["ID"]
  /** A timestamp when the transaction was executed */
  executedAt: Scalars["Timestamp"]
  /** A globally unique identifier for each transaction */
  id: Scalars["ID"]
  /** The user's unique id */
  userId: Scalars["ID"]
  /** How much each share/item was bought/sold for */
  value: Scalars["Float"]
  /** How many shares/items the user bought or sold */
  volume: Scalars["Float"]
}

/** Update only some values. */
export type UpdateUserSettings = {
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

/** Settings that can be customized by the user such as preferences as well as defaults */
export type UserSettings = {
  __typename?: "UserSettings"
  /** The user's default currency. Everything will be converted to this currency. */
  defaultCurrency: Scalars["String"]
  /** The user's default exchange. At the start only 1 exchange can be used. */
  defaultExchange: Exchange
  /** The unique user id */
  userId: Scalars["ID"]
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

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

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
  AssetHistory: ResolverTypeWrapper<AssetHistory>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  CacheControlScope: CacheControlScope
  Company: ResolverTypeWrapper<Company>
  String: ResolverTypeWrapper<Scalars["String"]>
  Float: ResolverTypeWrapper<Scalars["Float"]>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  CreateTransaction: CreateTransaction
  CreateUserSettings: CreateUserSettings
  Exchange: ResolverTypeWrapper<Exchange>
  Interval: Interval
  IssueType: IssueType
  Mutation: ResolverTypeWrapper<{}>
  PortfolioHistory: ResolverTypeWrapper<PortfolioHistory>
  Query: ResolverTypeWrapper<{}>
  RiskFreeRate: ResolverTypeWrapper<RiskFreeRate>
  Ticker: ResolverTypeWrapper<Ticker>
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>
  Transaction: ResolverTypeWrapper<Transaction>
  UpdateUserSettings: UpdateUserSettings
  UserSettings: ResolverTypeWrapper<UserSettings>
  ValueAndQuantityAtTime: ResolverTypeWrapper<ValueAndQuantityAtTime>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AssetHistory: AssetHistory
  ID: Scalars["ID"]
  Company: Company
  String: Scalars["String"]
  Float: Scalars["Float"]
  Int: Scalars["Int"]
  CreateTransaction: CreateTransaction
  CreateUserSettings: CreateUserSettings
  Exchange: Exchange
  Mutation: {}
  PortfolioHistory: PortfolioHistory
  Query: {}
  RiskFreeRate: RiskFreeRate
  Ticker: Ticker
  Timestamp: Scalars["Timestamp"]
  Transaction: Transaction
  UpdateUserSettings: UpdateUserSettings
  UserSettings: UserSettings
  ValueAndQuantityAtTime: ValueAndQuantityAtTime
  Boolean: Scalars["Boolean"]
}>

export type CacheControlDirectiveArgs = {
  maxAge?: Maybe<Scalars["Int"]>
  scope?: Maybe<CacheControlScope>
  inheritMaxAge?: Maybe<Scalars["Boolean"]>
}

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = CacheControlDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AssetHistoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AssetHistory"] = ResolversParentTypes["AssetHistory"],
> = ResolversObject<{
  assetId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  history?: Resolver<Array<ResolversTypes["ValueAndQuantityAtTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CompanyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Company"] = ResolversParentTypes["Company"],
> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  address2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  ceo?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  city?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  country?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  currentValue?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  employees?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  exchange?: Resolver<Maybe<ResolversTypes["Exchange"]>, ParentType, ContextType>
  industry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  issueType?: Resolver<Maybe<ResolversTypes["IssueType"]>, ParentType, ContextType>
  logo?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  phone?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  primarySicCode?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  sector?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  securityName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  state?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes["String"]>>>, ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  website?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  zip?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ExchangeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Exchange"] = ResolversParentTypes["Exchange"],
> = ResolversObject<{
  abbreviation?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  suffix?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  mic?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  region?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = ResolversObject<{
  createTransaction?: Resolver<
    ResolversTypes["Transaction"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTransactionArgs, "transaction">
  >
  createUserSettings?: Resolver<
    ResolversTypes["UserSettings"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserSettingsArgs, "userSettings">
  >
  deleteTransaction?: Resolver<
    Maybe<ResolversTypes["Transaction"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTransactionArgs, "transactionId">
  >
  subscribeToNewsletter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSubscribeToNewsletterArgs, "email">
  >
  updateUserSettings?: Resolver<
    ResolversTypes["UserSettings"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserSettingsArgs, "userSettings">
  >
}>

export type PortfolioHistoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PortfolioHistory"] = ResolversParentTypes["PortfolioHistory"],
> = ResolversObject<{
  assets?: Resolver<Array<ResolversTypes["AssetHistory"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  getAvailableCompaniesAtExchange?: Resolver<
    Array<ResolversTypes["Company"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetAvailableCompaniesAtExchangeArgs, "mic">
  >
  getCompany?: Resolver<
    Maybe<ResolversTypes["Company"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCompanyArgs, "ticker">
  >
  getExchanges?: Resolver<Array<ResolversTypes["Exchange"]>, ParentType, ContextType>
  getPortfolioHistory?: Resolver<
    ResolversTypes["PortfolioHistory"],
    ParentType,
    ContextType,
    RequireFields<QueryGetPortfolioHistoryArgs, "userId">
  >
  getRiskFreeRates?: Resolver<
    Array<ResolversTypes["RiskFreeRate"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetRiskFreeRatesArgs, "interval" | "begin">
  >
  getTicker?: Resolver<
    Maybe<ResolversTypes["Ticker"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetTickerArgs, "ticker">
  >
  getTransactions?: Resolver<
    Array<ResolversTypes["Transaction"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetTransactionsArgs, "userId">
  >
  getUserSettings?: Resolver<
    Maybe<ResolversTypes["UserSettings"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserSettingsArgs, "userId">
  >
  searchCompanies?: Resolver<
    Array<Maybe<ResolversTypes["Ticker"]>>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchCompaniesArgs, "fragment" | "mic">
  >
}>

export type RiskFreeRateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RiskFreeRate"] = ResolversParentTypes["RiskFreeRate"],
> = ResolversObject<{
  rate?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  time?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type TickerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Ticker"] = ResolversParentTypes["Ticker"],
> = ResolversObject<{
  currency?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  exchange?: Resolver<Maybe<ResolversTypes["Exchange"]>, ParentType, ContextType>
  figi?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  region?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes["IssueType"]>, ParentType, ContextType>
  company?: Resolver<Maybe<ResolversTypes["Company"]>, ParentType, ContextType>
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
  assetId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  executedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  userId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  volume?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserSettings"] = ResolversParentTypes["UserSettings"],
> = ResolversObject<{
  defaultCurrency?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  defaultExchange?: Resolver<ResolversTypes["Exchange"], ParentType, ContextType>
  userId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
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

export type Resolvers<ContextType = any> = ResolversObject<{
  AssetHistory?: AssetHistoryResolvers<ContextType>
  Company?: CompanyResolvers<ContextType>
  Exchange?: ExchangeResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  PortfolioHistory?: PortfolioHistoryResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  RiskFreeRate?: RiskFreeRateResolvers<ContextType>
  Ticker?: TickerResolvers<ContextType>
  Timestamp?: GraphQLScalarType
  Transaction?: TransactionResolvers<ContextType>
  UserSettings?: UserSettingsResolvers<ContextType>
  ValueAndQuantityAtTime?: ValueAndQuantityAtTimeResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>
}>

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>
export type CreateUserSettingsMutationVariables = Exact<{
  userSettings: CreateUserSettings
}>

export type CreateUserSettingsMutation = { __typename?: "Mutation" } & {
  createUserSettings: { __typename?: "UserSettings" } & Pick<UserSettings, "userId">
}

export type SubscribeToNewsletterMutationMutationVariables = Exact<{
  email: Scalars["String"]
}>

export type SubscribeToNewsletterMutationMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "subscribeToNewsletter"
>

export type UpdateUserSettingsMutationVariables = Exact<{
  userSettings: UpdateUserSettings
}>

export type UpdateUserSettingsMutation = { __typename?: "Mutation" } & {
  updateUserSettings: { __typename?: "UserSettings" } & Pick<UserSettings, "userId">
}

export type GetCompanyQueryVariables = Exact<{
  ticker: Scalars["String"]
  withExchange: Scalars["Boolean"]
}>

export type GetCompanyQuery = { __typename?: "Query" } & {
  getCompany?: Maybe<
    { __typename?: "Company" } & Pick<
      Company,
      "ticker" | "logo" | "name" | "description" | "sector"
    > & { exchange?: Maybe<{ __typename?: "Exchange" } & Pick<Exchange, "name" | "mic">> }
  >
}

export type GetExchangesQueryVariables = Exact<{ [key: string]: never }>

export type GetExchangesQuery = { __typename?: "Query" } & {
  getExchanges: Array<
    { __typename?: "Exchange" } & Pick<
      Exchange,
      "name" | "region" | "mic" | "suffix" | "abbreviation"
    >
  >
}

export type GetUserSettingsQueryVariables = Exact<{
  userId: Scalars["ID"]
}>

export type GetUserSettingsQuery = { __typename?: "Query" } & {
  getUserSettings?: Maybe<
    { __typename?: "UserSettings" } & Pick<UserSettings, "defaultCurrency"> & {
        defaultExchange: { __typename?: "Exchange" } & Pick<
          Exchange,
          "abbreviation" | "suffix" | "mic" | "name" | "region"
        >
      }
  >
}

export type SearchCompaniesQueryVariables = Exact<{
  fragment: Scalars["String"]
  mic: Scalars["String"]
}>

export type SearchCompaniesQuery = { __typename?: "Query" } & {
  searchCompanies: Array<
    Maybe<
      { __typename?: "Ticker" } & {
        company?: Maybe<
          { __typename?: "Company" } & Pick<Company, "ticker" | "logo" | "name" | "sector">
        >
      }
    >
  >
}

export const CreateUserSettingsDocument = gql`
  mutation CreateUserSettings($userSettings: CreateUserSettings!) {
    createUserSettings(userSettings: $userSettings) {
      userId
    }
  }
`
export type CreateUserSettingsMutationFn = Apollo.MutationFunction<
  CreateUserSettingsMutation,
  CreateUserSettingsMutationVariables
>

/**
 * __useCreateUserSettingsMutation__
 *
 * To run a mutation, you first call `useCreateUserSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserSettingsMutation, { data, loading, error }] = useCreateUserSettingsMutation({
 *   variables: {
 *      userSettings: // value for 'userSettings'
 *   },
 * });
 */
export function useCreateUserSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserSettingsMutation,
    CreateUserSettingsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserSettingsMutation, CreateUserSettingsMutationVariables>(
    CreateUserSettingsDocument,
    options,
  )
}
export type CreateUserSettingsMutationHookResult = ReturnType<typeof useCreateUserSettingsMutation>
export type CreateUserSettingsMutationResult = Apollo.MutationResult<CreateUserSettingsMutation>
export type CreateUserSettingsMutationOptions = Apollo.BaseMutationOptions<
  CreateUserSettingsMutation,
  CreateUserSettingsMutationVariables
>
export const SubscribeToNewsletterMutationDocument = gql`
  mutation SubscribeToNewsletterMutation($email: String!) {
    subscribeToNewsletter(email: $email)
  }
`
export type SubscribeToNewsletterMutationMutationFn = Apollo.MutationFunction<
  SubscribeToNewsletterMutationMutation,
  SubscribeToNewsletterMutationMutationVariables
>

/**
 * __useSubscribeToNewsletterMutationMutation__
 *
 * To run a mutation, you first call `useSubscribeToNewsletterMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToNewsletterMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeToNewsletterMutationMutation, { data, loading, error }] = useSubscribeToNewsletterMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSubscribeToNewsletterMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubscribeToNewsletterMutationMutation,
    SubscribeToNewsletterMutationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    SubscribeToNewsletterMutationMutation,
    SubscribeToNewsletterMutationMutationVariables
  >(SubscribeToNewsletterMutationDocument, options)
}
export type SubscribeToNewsletterMutationMutationHookResult = ReturnType<
  typeof useSubscribeToNewsletterMutationMutation
>
export type SubscribeToNewsletterMutationMutationResult =
  Apollo.MutationResult<SubscribeToNewsletterMutationMutation>
export type SubscribeToNewsletterMutationMutationOptions = Apollo.BaseMutationOptions<
  SubscribeToNewsletterMutationMutation,
  SubscribeToNewsletterMutationMutationVariables
>
export const UpdateUserSettingsDocument = gql`
  mutation updateUserSettings($userSettings: UpdateUserSettings!) {
    updateUserSettings(userSettings: $userSettings) {
      userId
    }
  }
`
export type UpdateUserSettingsMutationFn = Apollo.MutationFunction<
  UpdateUserSettingsMutation,
  UpdateUserSettingsMutationVariables
>

/**
 * __useUpdateUserSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateUserSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSettingsMutation, { data, loading, error }] = useUpdateUserSettingsMutation({
 *   variables: {
 *      userSettings: // value for 'userSettings'
 *   },
 * });
 */
export function useUpdateUserSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserSettingsMutation,
    UpdateUserSettingsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>(
    UpdateUserSettingsDocument,
    options,
  )
}
export type UpdateUserSettingsMutationHookResult = ReturnType<typeof useUpdateUserSettingsMutation>
export type UpdateUserSettingsMutationResult = Apollo.MutationResult<UpdateUserSettingsMutation>
export type UpdateUserSettingsMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserSettingsMutation,
  UpdateUserSettingsMutationVariables
>
export const GetCompanyDocument = gql`
  query getCompany($ticker: String!, $withExchange: Boolean!) {
    getCompany(ticker: $ticker) {
      ticker
      logo
      name
      exchange @include(if: $withExchange) {
        name
        mic
      }
      description
      sector
    }
  }
`

/**
 * __useGetCompanyQuery__
 *
 * To run a query within a React component, call `useGetCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyQuery({
 *   variables: {
 *      ticker: // value for 'ticker'
 *      withExchange: // value for 'withExchange'
 *   },
 * });
 */
export function useGetCompanyQuery(
  baseOptions: Apollo.QueryHookOptions<GetCompanyQuery, GetCompanyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, options)
}
export function useGetCompanyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyQuery, GetCompanyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, options)
}
export type GetCompanyQueryHookResult = ReturnType<typeof useGetCompanyQuery>
export type GetCompanyLazyQueryHookResult = ReturnType<typeof useGetCompanyLazyQuery>
export type GetCompanyQueryResult = Apollo.QueryResult<GetCompanyQuery, GetCompanyQueryVariables>
export const GetExchangesDocument = gql`
  query getExchanges {
    getExchanges {
      name
      region
      mic
      suffix
      abbreviation
    }
  }
`

/**
 * __useGetExchangesQuery__
 *
 * To run a query within a React component, call `useGetExchangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExchangesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetExchangesQuery, GetExchangesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetExchangesQuery, GetExchangesQueryVariables>(
    GetExchangesDocument,
    options,
  )
}
export function useGetExchangesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetExchangesQuery, GetExchangesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetExchangesQuery, GetExchangesQueryVariables>(
    GetExchangesDocument,
    options,
  )
}
export type GetExchangesQueryHookResult = ReturnType<typeof useGetExchangesQuery>
export type GetExchangesLazyQueryHookResult = ReturnType<typeof useGetExchangesLazyQuery>
export type GetExchangesQueryResult = Apollo.QueryResult<
  GetExchangesQuery,
  GetExchangesQueryVariables
>
export const GetUserSettingsDocument = gql`
  query getUserSettings($userId: ID!) {
    getUserSettings(userId: $userId) {
      defaultCurrency
      defaultExchange {
        abbreviation
        suffix
        mic
        name
        region
      }
    }
  }
`

/**
 * __useGetUserSettingsQuery__
 *
 * To run a query within a React component, call `useGetUserSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSettingsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserSettingsQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserSettingsQuery, GetUserSettingsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserSettingsQuery, GetUserSettingsQueryVariables>(
    GetUserSettingsDocument,
    options,
  )
}
export function useGetUserSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserSettingsQuery, GetUserSettingsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserSettingsQuery, GetUserSettingsQueryVariables>(
    GetUserSettingsDocument,
    options,
  )
}
export type GetUserSettingsQueryHookResult = ReturnType<typeof useGetUserSettingsQuery>
export type GetUserSettingsLazyQueryHookResult = ReturnType<typeof useGetUserSettingsLazyQuery>
export type GetUserSettingsQueryResult = Apollo.QueryResult<
  GetUserSettingsQuery,
  GetUserSettingsQueryVariables
>
export const SearchCompaniesDocument = gql`
  query searchCompanies($fragment: String!, $mic: String!) {
    searchCompanies(fragment: $fragment, mic: $mic) {
      company {
        ticker
        logo
        name
        sector
      }
    }
  }
`

/**
 * __useSearchCompaniesQuery__
 *
 * To run a query within a React component, call `useSearchCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCompaniesQuery({
 *   variables: {
 *      fragment: // value for 'fragment'
 *      mic: // value for 'mic'
 *   },
 * });
 */
export function useSearchCompaniesQuery(
  baseOptions: Apollo.QueryHookOptions<SearchCompaniesQuery, SearchCompaniesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchCompaniesQuery, SearchCompaniesQueryVariables>(
    SearchCompaniesDocument,
    options,
  )
}
export function useSearchCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchCompaniesQuery, SearchCompaniesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchCompaniesQuery, SearchCompaniesQueryVariables>(
    SearchCompaniesDocument,
    options,
  )
}
export type SearchCompaniesQueryHookResult = ReturnType<typeof useSearchCompaniesQuery>
export type SearchCompaniesLazyQueryHookResult = ReturnType<typeof useSearchCompaniesLazyQuery>
export type SearchCompaniesQueryResult = Apollo.QueryResult<
  SearchCompaniesQuery,
  SearchCompaniesQueryVariables
>
