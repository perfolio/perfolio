import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"
import { DocumentNode } from "graphql"
import gql from "graphql-tag"
export type Maybe<T> = T | null | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
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

export type Asset = Crypto | Stock

/** The value and volume of an asset over time. */
export type AssetHistory = {
  __typename?: "AssetHistory"
  /** The asset */
  asset: Asset
  /** Value and Quantity for each day */
  history: Array<ValueAndQuantityAtTime>
}

/** The interval for timeseries */
export enum AssetType {
  /** Ownership of a fraction of a corporation or fund. */
  Stock = "STOCK",
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
  /** Refers to the industry the company belongs to */
  industry?: Maybe<Scalars["String"]>
  /** Refers to the common issue type of the stock. */
  issueType?: Maybe<IssueType>
  /** Url of the logo */
  logo: Scalars["String"]
  /** Name of the company */
  name: Scalars["String"]
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
  /** The owner of this transaction */
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

export type Crypto = IAsset & {
  __typename?: "Crypto"
  id: Scalars["ID"]
  name: Scalars["String"]
}

/** An exchange where shares are traded */
export type Exchange = {
  __typename?: "Exchange"
  /** Exchange abbreviation */
  abbreviation: Scalars["String"]
  /** Exchange Suffix to be added for symbols on that exchange */
  suffix?: Maybe<Scalars["String"]>
  /** Market Identifier Code using ISO 10383 */
  mic: Scalars["String"]
  /** Full name of the exchange. */
  name: Scalars["String"]
  /** 2 letter case insensitive string of country codes using ISO 3166-1 alpha-2 */
  region: Scalars["String"]
}

export type Holding = {
  __typename?: "Holding"
  asset: Asset
  quantity: Scalars["Float"]
}

export type IAsset = {
  id: Scalars["ID"]
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
  createTransaction?: Maybe<Transaction>
  /** Create and store settings for the first time. For example when a new user signs up. */
  createUserSettings: UserSettings
  /** Delete a single transaction from the database */
  deleteTransaction: Scalars["ID"]
  /** Enter the user's email into our newsletter list. */
  subscribeToNewsletter: Scalars["String"]
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

export type Price = {
  __typename?: "Price"
  value: Scalars["Float"]
  time: Scalars["Timestamp"]
}

/** Available queries */
export type Query = {
  __typename?: "Query"
  /** Return a list of all companies that can be traded at a certain exchange */
  getAvailableCompaniesAtExchange: Array<Company>
  /** Return the daily closing prices for a stock at a specific exchange */
  getStockPricesAtExchange: Array<Price>
  /** Return a company by its symbol */
  getCompany?: Maybe<Company>
  /** Get a list of all availale exchanges */
  getExchanges: Array<Exchange>
  /** Return all assets over time for a given user */
  getPortfolioHistory: Array<AssetHistory>
  /** Get the risk free rates for a given interval */
  getRiskFreeRates: Array<RiskFreeRate>
  /** Return all transactions of a user */
  getTransactions: Array<Transaction>
  /** Return the user's settings */
  getUserSettings?: Maybe<UserSettings>
  /**
   * Return matching isins for a given search string
   *
   * The fragment will be compared against the ticker and company name.
   */
  search: Array<SearchResult>
  getCompanyFromIsin?: Maybe<Company>
}

/** Available queries */
export type QueryGetAvailableCompaniesAtExchangeArgs = {
  mic: Scalars["String"]
}

/** Available queries */
export type QueryGetStockPricesAtExchangeArgs = {
  ticker: Scalars["String"]
  mic: Scalars["String"]
  start: Scalars["Timestamp"]
  end: Scalars["Timestamp"]
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
export type QueryGetTransactionsArgs = {
  userId: Scalars["ID"]
}

/** Available queries */
export type QueryGetUserSettingsArgs = {
  userId: Scalars["ID"]
}

/** Available queries */
export type QuerySearchArgs = {
  fragment: Scalars["String"]
}

/** Available queries */
export type QueryGetCompanyFromIsinArgs = {
  isin: Scalars["ID"]
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

export type SearchResult = {
  __typename?: "SearchResult"
  isin: Scalars["ID"]
  ticker: Scalars["ID"]
  company: Company
}

/** Stocks such as company shares and funds. */
export type Stock = IAsset & {
  __typename?: "Stock"
  /** For stocks we are always using the isin as id. */
  id: Scalars["ID"]
  /** The ticker of a stock. This does not include pre/suffixes for different exchanges */
  ticker: Scalars["String"]
  /**
   * The associated company if available
   *
   * This probably does not carry much meaningful data for ETFs etc.
   */
  company?: Maybe<Company>
}

/** A transactions represents a single purchase or sale of any number of shares of a single asset. */
export type Transaction = {
  __typename?: "Transaction"
  /** The of asset. Stocks, Crypto, Real estate for example. */
  asset: Asset
  /** A timestamp when the transaction was executed */
  executedAt: Scalars["Timestamp"]
  /** A globally unique identifier for each transaction */
  id: Scalars["ID"]
  /** The owner of this transaction */
  userId: Scalars["ID"]
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

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  email: Scalars["String"]
  name: Scalars["String"]
}

/** Settings that can be customized by the user such as preferences as well as defaults */
export type UserSettings = {
  __typename?: "UserSettings"
  /** The user's default currency. Everything will be converted to this currency. */
  defaultCurrency: Scalars["String"]
  /** The user's default exchange. At the start only 1 exchange can be used. */
  defaultExchange: Exchange
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
  Asset: ResolversTypes["Crypto"] | ResolversTypes["Stock"]
  AssetHistory: ResolverTypeWrapper<
    Omit<AssetHistory, "asset"> & { asset: ResolversTypes["Asset"] }
  >
  AssetType: AssetType
  Company: ResolverTypeWrapper<Company>
  String: ResolverTypeWrapper<Scalars["String"]>
  Float: ResolverTypeWrapper<Scalars["Float"]>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  CreateTransaction: CreateTransaction
  ID: ResolverTypeWrapper<Scalars["ID"]>
  CreateUserSettings: CreateUserSettings
  Crypto: ResolverTypeWrapper<Crypto>
  Exchange: ResolverTypeWrapper<Exchange>
  Holding: ResolverTypeWrapper<Omit<Holding, "asset"> & { asset: ResolversTypes["Asset"] }>
  IAsset: ResolversTypes["Crypto"] | ResolversTypes["Stock"]
  Interval: Interval
  IssueType: IssueType
  Mutation: ResolverTypeWrapper<{}>
  Price: ResolverTypeWrapper<Price>
  Query: ResolverTypeWrapper<{}>
  RiskFreeRate: ResolverTypeWrapper<RiskFreeRate>
  SearchResult: ResolverTypeWrapper<SearchResult>
  Stock: ResolverTypeWrapper<Stock>
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>
  Transaction: ResolverTypeWrapper<Omit<Transaction, "asset"> & { asset: ResolversTypes["Asset"] }>
  UpdateUserSettings: UpdateUserSettings
  User: ResolverTypeWrapper<User>
  UserSettings: ResolverTypeWrapper<UserSettings>
  ValueAndQuantityAtTime: ResolverTypeWrapper<ValueAndQuantityAtTime>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Asset: ResolversParentTypes["Crypto"] | ResolversParentTypes["Stock"]
  AssetHistory: Omit<AssetHistory, "asset"> & { asset: ResolversParentTypes["Asset"] }
  Company: Company
  String: Scalars["String"]
  Float: Scalars["Float"]
  Int: Scalars["Int"]
  CreateTransaction: CreateTransaction
  ID: Scalars["ID"]
  CreateUserSettings: CreateUserSettings
  Crypto: Crypto
  Exchange: Exchange
  Holding: Omit<Holding, "asset"> & { asset: ResolversParentTypes["Asset"] }
  IAsset: ResolversParentTypes["Crypto"] | ResolversParentTypes["Stock"]
  Mutation: {}
  Price: Price
  Query: {}
  RiskFreeRate: RiskFreeRate
  SearchResult: SearchResult
  Stock: Stock
  Timestamp: Scalars["Timestamp"]
  Transaction: Omit<Transaction, "asset"> & { asset: ResolversParentTypes["Asset"] }
  UpdateUserSettings: UpdateUserSettings
  User: User
  UserSettings: UserSettings
  ValueAndQuantityAtTime: ValueAndQuantityAtTime
  Boolean: Scalars["Boolean"]
}>

export type AssetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Asset"] = ResolversParentTypes["Asset"],
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Crypto" | "Stock", ParentType, ContextType>
}>

export type AssetHistoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AssetHistory"] = ResolversParentTypes["AssetHistory"],
> = ResolversObject<{
  asset?: Resolver<ResolversTypes["Asset"], ParentType, ContextType>
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
  industry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  issueType?: Resolver<Maybe<ResolversTypes["IssueType"]>, ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
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

export type CryptoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Crypto"] = ResolversParentTypes["Crypto"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ExchangeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Exchange"] = ResolversParentTypes["Exchange"],
> = ResolversObject<{
  abbreviation?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  suffix?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  mic?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  region?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type HoldingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Holding"] = ResolversParentTypes["Holding"],
> = ResolversObject<{
  asset?: Resolver<ResolversTypes["Asset"], ParentType, ContextType>
  quantity?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type IAssetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["IAsset"] = ResolversParentTypes["IAsset"],
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Crypto" | "Stock", ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = ResolversObject<{
  createTransaction?: Resolver<
    Maybe<ResolversTypes["Transaction"]>,
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
  updateUserSettings?: Resolver<
    ResolversTypes["UserSettings"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserSettingsArgs, "userSettings">
  >
}>

export type PriceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Price"] = ResolversParentTypes["Price"],
> = ResolversObject<{
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  time?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>
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
  getStockPricesAtExchange?: Resolver<
    Array<ResolversTypes["Price"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetStockPricesAtExchangeArgs, "ticker" | "mic" | "start" | "end">
  >
  getCompany?: Resolver<
    Maybe<ResolversTypes["Company"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCompanyArgs, "ticker">
  >
  getExchanges?: Resolver<Array<ResolversTypes["Exchange"]>, ParentType, ContextType>
  getPortfolioHistory?: Resolver<
    Array<ResolversTypes["AssetHistory"]>,
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
  search?: Resolver<
    Array<ResolversTypes["SearchResult"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchArgs, "fragment">
  >
  getCompanyFromIsin?: Resolver<
    Maybe<ResolversTypes["Company"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCompanyFromIsinArgs, "isin">
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

export type SearchResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SearchResult"] = ResolversParentTypes["SearchResult"],
> = ResolversObject<{
  isin?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  company?: Resolver<ResolversTypes["Company"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type StockResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Stock"] = ResolversParentTypes["Stock"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
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
  asset?: Resolver<ResolversTypes["Asset"], ParentType, ContextType>
  executedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  userId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  volume?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserSettings"] = ResolversParentTypes["UserSettings"],
> = ResolversObject<{
  defaultCurrency?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  defaultExchange?: Resolver<ResolversTypes["Exchange"], ParentType, ContextType>
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
  Asset?: AssetResolvers<ContextType>
  AssetHistory?: AssetHistoryResolvers<ContextType>
  Company?: CompanyResolvers<ContextType>
  Crypto?: CryptoResolvers<ContextType>
  Exchange?: ExchangeResolvers<ContextType>
  Holding?: HoldingResolvers<ContextType>
  IAsset?: IAssetResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Price?: PriceResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  RiskFreeRate?: RiskFreeRateResolvers<ContextType>
  SearchResult?: SearchResultResolvers<ContextType>
  Stock?: StockResolvers<ContextType>
  Timestamp?: GraphQLScalarType
  Transaction?: TransactionResolvers<ContextType>
  User?: UserResolvers<ContextType>
  UserSettings?: UserSettingsResolvers<ContextType>
  ValueAndQuantityAtTime?: ValueAndQuantityAtTimeResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>

export type CreateTransactionMutationVariables = Exact<{
  transaction: CreateTransaction
}>

export type CreateTransactionMutation = { __typename?: "Mutation" } & {
  createTransaction?: Maybe<{ __typename?: "Transaction" } & Pick<Transaction, "id">>
}

export type CreateUserSettingsMutationVariables = Exact<{
  userSettings: CreateUserSettings
}>

export type CreateUserSettingsMutation = { __typename?: "Mutation" } & {
  createUserSettings: { __typename?: "UserSettings" } & Pick<UserSettings, "defaultCurrency"> & {
      defaultExchange: { __typename?: "Exchange" } & Pick<Exchange, "mic">
    }
}

export type DeleteTransactionMutationVariables = Exact<{
  transactionId: Scalars["ID"]
}>

export type DeleteTransactionMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteTransaction"
>

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
  updateUserSettings: { __typename?: "UserSettings" } & Pick<UserSettings, "defaultCurrency"> & {
      defaultExchange: { __typename?: "Exchange" } & Pick<Exchange, "mic">
    }
}

export type GetCompanyQueryVariables = Exact<{
  ticker: Scalars["String"]
}>

export type GetCompanyQuery = { __typename?: "Query" } & {
  getCompany?: Maybe<
    { __typename?: "Company" } & Pick<
      Company,
      "ticker" | "logo" | "name" | "description" | "sector"
    >
  >
}

export type GetCompanyFromIsinQueryVariables = Exact<{
  isin: Scalars["ID"]
}>

export type GetCompanyFromIsinQuery = { __typename?: "Query" } & {
  getCompanyFromIsin?: Maybe<
    { __typename?: "Company" } & Pick<
      Company,
      "ticker" | "logo" | "name" | "description" | "sector"
    >
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

export type GetPortfolioHistoryQueryVariables = Exact<{
  userId: Scalars["String"]
}>

export type GetPortfolioHistoryQuery = { __typename?: "Query" } & {
  getPortfolioHistory: Array<
    { __typename?: "AssetHistory" } & {
      asset:
        | ({ __typename?: "Crypto" } & Pick<Crypto, "id" | "name">)
        | ({ __typename?: "Stock" } & Pick<Stock, "id" | "ticker"> & {
              company?: Maybe<
                { __typename?: "Company" } & Pick<
                  Company,
                  "name" | "logo" | "sector" | "country" | "ticker" | "currentValue"
                >
              >
            })
      history: Array<
        { __typename?: "ValueAndQuantityAtTime" } & Pick<
          ValueAndQuantityAtTime,
          "value" | "time" | "quantity"
        >
      >
    }
  >
}

export type GetTransactionsQueryVariables = Exact<{
  userId: Scalars["ID"]
}>

export type GetTransactionsQuery = { __typename?: "Query" } & {
  getTransactions: Array<
    { __typename?: "Transaction" } & Pick<
      Transaction,
      "id" | "userId" | "executedAt" | "value" | "volume"
    > & {
        asset:
          | ({ __typename?: "Crypto" } & Pick<Crypto, "id">)
          | ({ __typename?: "Stock" } & Pick<Stock, "id" | "ticker">)
      }
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

export type SearchQueryVariables = Exact<{
  fragment: Scalars["String"]
}>

export type SearchQuery = { __typename?: "Query" } & {
  search: Array<
    { __typename?: "SearchResult" } & Pick<SearchResult, "isin"> & {
        company: { __typename?: "Company" } & Pick<Company, "logo" | "ticker" | "name">
      }
  >
}

export const CreateTransactionDocument = gql`
  mutation CreateTransaction($transaction: CreateTransaction!) {
    createTransaction(transaction: $transaction) {
      id
    }
  }
`
export const CreateUserSettingsDocument = gql`
  mutation CreateUserSettings($userSettings: CreateUserSettings!) {
    createUserSettings(userSettings: $userSettings) {
      defaultCurrency
      defaultExchange {
        mic
      }
    }
  }
`
export const DeleteTransactionDocument = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId)
  }
`
export const SubscribeToNewsletterMutationDocument = gql`
  mutation SubscribeToNewsletterMutation($email: String!) {
    subscribeToNewsletter(email: $email)
  }
`
export const UpdateUserSettingsDocument = gql`
  mutation updateUserSettings($userSettings: UpdateUserSettings!) {
    updateUserSettings(userSettings: $userSettings) {
      defaultCurrency
      defaultExchange {
        mic
      }
    }
  }
`
export const GetCompanyDocument = gql`
  query getCompany($ticker: String!) {
    getCompany(ticker: $ticker) {
      ticker
      logo
      name
      description
      sector
    }
  }
`
export const GetCompanyFromIsinDocument = gql`
  query getCompanyFromIsin($isin: ID!) {
    getCompanyFromIsin(isin: $isin) {
      ticker
      logo
      name
      description
      sector
    }
  }
`
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
export const GetPortfolioHistoryDocument = gql`
  query getPortfolioHistory($userId: String!) {
    getPortfolioHistory(userId: $userId) {
      asset {
        ... on Stock {
          id
          ticker
          company {
            name
            logo
            sector
            country
            ticker
            currentValue
          }
        }
        ... on Crypto {
          id
          name
        }
      }
      history {
        value
        time
        quantity
      }
    }
  }
`
export const GetTransactionsDocument = gql`
  query getTransactions($userId: ID!) {
    getTransactions(userId: $userId) {
      id
      asset {
        ... on Stock {
          id
          ticker
        }
        ... on Crypto {
          id
        }
      }
      userId
      executedAt
      value
      volume
    }
  }
`
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
export const SearchDocument = gql`
  query search($fragment: String!) {
    search(fragment: $fragment) {
      isin
      company {
        logo
        ticker
        name
      }
    }
  }
`
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    CreateTransaction(
      variables: CreateTransactionMutationVariables,
      options?: C,
    ): Promise<CreateTransactionMutation> {
      return requester<CreateTransactionMutation, CreateTransactionMutationVariables>(
        CreateTransactionDocument,
        variables,
        options,
      )
    },
    CreateUserSettings(
      variables: CreateUserSettingsMutationVariables,
      options?: C,
    ): Promise<CreateUserSettingsMutation> {
      return requester<CreateUserSettingsMutation, CreateUserSettingsMutationVariables>(
        CreateUserSettingsDocument,
        variables,
        options,
      )
    },
    DeleteTransaction(
      variables: DeleteTransactionMutationVariables,
      options?: C,
    ): Promise<DeleteTransactionMutation> {
      return requester<DeleteTransactionMutation, DeleteTransactionMutationVariables>(
        DeleteTransactionDocument,
        variables,
        options,
      )
    },
    SubscribeToNewsletterMutation(
      variables: SubscribeToNewsletterMutationMutationVariables,
      options?: C,
    ): Promise<SubscribeToNewsletterMutationMutation> {
      return requester<
        SubscribeToNewsletterMutationMutation,
        SubscribeToNewsletterMutationMutationVariables
      >(SubscribeToNewsletterMutationDocument, variables, options)
    },
    updateUserSettings(
      variables: UpdateUserSettingsMutationVariables,
      options?: C,
    ): Promise<UpdateUserSettingsMutation> {
      return requester<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>(
        UpdateUserSettingsDocument,
        variables,
        options,
      )
    },
    getCompany(variables: GetCompanyQueryVariables, options?: C): Promise<GetCompanyQuery> {
      return requester<GetCompanyQuery, GetCompanyQueryVariables>(
        GetCompanyDocument,
        variables,
        options,
      )
    },
    getCompanyFromIsin(
      variables: GetCompanyFromIsinQueryVariables,
      options?: C,
    ): Promise<GetCompanyFromIsinQuery> {
      return requester<GetCompanyFromIsinQuery, GetCompanyFromIsinQueryVariables>(
        GetCompanyFromIsinDocument,
        variables,
        options,
      )
    },
    getExchanges(variables?: GetExchangesQueryVariables, options?: C): Promise<GetExchangesQuery> {
      return requester<GetExchangesQuery, GetExchangesQueryVariables>(
        GetExchangesDocument,
        variables,
        options,
      )
    },
    getPortfolioHistory(
      variables: GetPortfolioHistoryQueryVariables,
      options?: C,
    ): Promise<GetPortfolioHistoryQuery> {
      return requester<GetPortfolioHistoryQuery, GetPortfolioHistoryQueryVariables>(
        GetPortfolioHistoryDocument,
        variables,
        options,
      )
    },
    getTransactions(
      variables: GetTransactionsQueryVariables,
      options?: C,
    ): Promise<GetTransactionsQuery> {
      return requester<GetTransactionsQuery, GetTransactionsQueryVariables>(
        GetTransactionsDocument,
        variables,
        options,
      )
    },
    getUserSettings(
      variables: GetUserSettingsQueryVariables,
      options?: C,
    ): Promise<GetUserSettingsQuery> {
      return requester<GetUserSettingsQuery, GetUserSettingsQueryVariables>(
        GetUserSettingsDocument,
        variables,
        options,
      )
    },
    search(variables: SearchQueryVariables, options?: C): Promise<SearchQuery> {
      return requester<SearchQuery, SearchQueryVariables>(SearchDocument, variables, options)
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
