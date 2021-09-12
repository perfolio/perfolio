import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"
import { DocumentNode } from "graphql"
import gql from "graphql-tag"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
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

/** Access scope */
export enum Access {
  /** Everyone has access */
  Public = "PUBLIC",
  /** Only the createor and shared users have access */
  Private = "PRIVATE",
}

/** Common fields on all assets */
export type Asset = {
  /** Globally unique id */
  id: Scalars["ID"]
}

/** The value and volume of an asset over time. */
export type AssetHistory = {
  __typename?: "AssetHistory"
  /** For reference */
  assetId: Scalars["String"]
  /** The asset */
  asset: ExchangeTradedAsset
  /** Value and Quantity for each day */
  history: Array<ValueAndQuantityAtTime>
}

/** Stocks such as company shares and funds. */
export type CompanyStock = ExchangeTradedAsset &
  Asset & {
    __typename?: "CompanyStock"
    /** For stocks we are always using the isin as id. */
    id: Scalars["ID"]
    /** International Securities Indentification Number */
    isin: Scalars["String"]
    /** The companys name */
    name: Scalars["String"]
    /** The companys logo url */
    logo: Scalars["String"]
    /** The ticker of a stock. This does not include pre/suffixes for different exchanges */
    ticker: Scalars["String"]
    /** The main sector of this company */
    sector: Scalars["String"]
    /** The country where this company is registered */
    country: Scalars["String"]
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
  /** The portfolio of this transaction */
  portfolioId: Scalars["ID"]
  /** How much each share/item was bought/sold for */
  value: Scalars["Float"]
  /** How many shares/items the user bought or sold */
  volume: Scalars["Float"]
  /** The market identifier code where the user intends to sell this asset */
  mic?: Maybe<Scalars["String"]>
}

/** Crypto */
export type Crypto = ExchangeTradedAsset &
  Asset & {
    __typename?: "Crypto"
    /** A globally unique id */
    id: Scalars["ID"]
    /** Dummy field */
    name: Scalars["String"]
    /** A */
    ticker: Scalars["String"]
    /** B */
    logo: Scalars["String"]
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
  /** The ticker as used by the exchanges. */
  ticker: Scalars["String"]
  /** Human readable name */
  name: Scalars["String"]
  /** URL to the logo or image */
  logo: Scalars["String"]
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

/** Available mutations */
export type Mutation = {
  __typename?: "Mutation"
  /** Create a new transaction */
  createTransaction?: Maybe<Transaction>
  /** Create and store settings for the first time. For example when a new user signs up. */
  createSettings: Settings
  /** Delete a single transaction from the database */
  deleteTransaction: Scalars["ID"]
  /** Enter the user's email into our newsletter list. */
  subscribeToNewsletter: Scalars["String"]
  /** Only update some values in the user settings. */
  updateSettings: Settings
}

/** Available mutations */
export type MutationCreateTransactionArgs = {
  transaction: CreateTransaction
}

/** Available mutations */
export type MutationCreateSettingsArgs = {
  settings: CreateSettings
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
  /** unique id */
  id: Scalars["ID"]
  /** Human readable name for the portfolio */
  name: Scalars["String"]
  /** The owner of this portfolio */
  user: User
  /** The primary portfolio will be displayed by default */
  primary: Scalars["Boolean"]
  /**
   * Public portfolios can be seen by anyone with the portfolio id
   * Private portfolios are only visible to the owner and users who were
   * granted access.
   */
  access?: Maybe<Access>
  /** Ids of users who have read access for this portfolio */
  grantReadAccess: Array<Scalars["ID"]>
  /** Associated transactions */
  transactions: Array<Transaction>
}

/** Available queries */
export type Query = {
  __typename?: "Query"
  /** Load all portfolios from the user */
  getPortfolios: Array<Portfolio>
  /** Load a portfolio */
  getPortfolio: Portfolio
  /** load the users primary portfolio */
  getPrimaryPortfolio: Portfolio
  /** Load an exchange traded asset by its id */
  getExchangeTradedAsset?: Maybe<ExchangeTradedAsset>
  /** Get a list of all availale exchanges */
  getExchanges: Array<Exchange>
  /** Return an index for the performance of the users portfolio */
  getRelativePortfolioHistory: Array<ValueAtTime>
  /** Return all assets over time for a given user */
  getPortfolioHistory: Array<AssetHistory>
  /** Get the risk free rates for a given interval */
  getRiskFreeRates: Array<ValueAtTime>
  /** Return the daily closing prices for a stock at a specific exchange */
  getStockPricesAtExchange: Array<ValueAtTime>
  /** Return all transactions of a user */
  getTransactions: Array<Transaction>
  /** Load a user by their id */
  getUser?: Maybe<User>
  /** Return the user's settings */
  getSettings?: Maybe<Settings>
  /**
   * Return matching isins for a given search string
   *
   * The fragment will be compared against the ticker and company name.
   */
  search: Array<SearchResult>
}

/** Available queries */
export type QueryGetPortfoliosArgs = {
  userId: Scalars["ID"]
}

/** Available queries */
export type QueryGetPortfolioArgs = {
  portfolioId: Scalars["ID"]
}

/** Available queries */
export type QueryGetPrimaryPortfolioArgs = {
  userID: Scalars["ID"]
}

/** Available queries */
export type QueryGetExchangeTradedAssetArgs = {
  id: Scalars["ID"]
}

/** Available queries */
export type QueryGetRelativePortfolioHistoryArgs = {
  portfolioId: Scalars["String"]
  since?: Maybe<Scalars["Int"]>
}

/** Available queries */
export type QueryGetPortfolioHistoryArgs = {
  portfolioId: Scalars["String"]
}

/** Available queries */
export type QueryGetRiskFreeRatesArgs = {
  interval: Interval
  begin: Scalars["Timestamp"]
  end?: Maybe<Scalars["Timestamp"]>
}

/** Available queries */
export type QueryGetStockPricesAtExchangeArgs = {
  ticker: Scalars["String"]
  mic: Scalars["String"]
  start: Scalars["Timestamp"]
  end?: Maybe<Scalars["Timestamp"]>
}

/** Available queries */
export type QueryGetTransactionsArgs = {
  portfolioId: Scalars["ID"]
}

/** Available queries */
export type QueryGetUserArgs = {
  userId: Scalars["ID"]
}

/** Available queries */
export type QueryGetSettingsArgs = {
  userId: Scalars["ID"]
}

/** Available queries */
export type QuerySearchArgs = {
  fragment: Scalars["String"]
}

/** The found company from a user search. */
export type SearchResult = {
  __typename?: "SearchResult"
  /** For reference */
  assetId: Scalars["String"]
  /** All company data itself */
  asset: ExchangeTradedAsset
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
  /** Reference to the actual asset */
  assetId: Scalars["String"]
  /** The of asset. Stocks, Crypto, Real estate for example. */
  asset: ExchangeTradedAsset
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
  /** The market identifier code where the user intends to sell this asset */
  mic?: Maybe<Scalars["String"]>
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
  /** A unique identifier: stored as uuid */
  id: Scalars["ID"]
  /** The user's email */
  email: Scalars["String"]
  /** StripeCustomerId */
  stripeCustomerId: Scalars["String"]
  /** The user's settings */
  settings?: Maybe<Settings>
  /** All portfolios that the user has created */
  portfolios: Array<Portfolio>
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
  Access: Access
  Asset: ResolversTypes["CompanyStock"] | ResolversTypes["Crypto"]
  ID: ResolverTypeWrapper<Scalars["ID"]>
  AssetHistory: ResolverTypeWrapper<AssetHistory>
  String: ResolverTypeWrapper<Scalars["String"]>
  CompanyStock: ResolverTypeWrapper<CompanyStock>
  CreateSettings: CreateSettings
  CreateTransaction: CreateTransaction
  Float: ResolverTypeWrapper<Scalars["Float"]>
  Crypto: ResolverTypeWrapper<Crypto>
  Exchange: ResolverTypeWrapper<Exchange>
  ExchangeTradedAsset: ResolversTypes["CompanyStock"] | ResolversTypes["Crypto"]
  Interval: Interval
  Mutation: ResolverTypeWrapper<{}>
  Portfolio: ResolverTypeWrapper<Portfolio>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  SearchResult: ResolverTypeWrapper<SearchResult>
  Settings: ResolverTypeWrapper<Settings>
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
  ID: Scalars["ID"]
  AssetHistory: AssetHistory
  String: Scalars["String"]
  CompanyStock: CompanyStock
  CreateSettings: CreateSettings
  CreateTransaction: CreateTransaction
  Float: Scalars["Float"]
  Crypto: Crypto
  Exchange: Exchange
  ExchangeTradedAsset: ResolversParentTypes["CompanyStock"] | ResolversParentTypes["Crypto"]
  Mutation: {}
  Portfolio: Portfolio
  Boolean: Scalars["Boolean"]
  Query: {}
  Int: Scalars["Int"]
  SearchResult: SearchResult
  Settings: Settings
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
}>

export type AssetHistoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AssetHistory"] = ResolversParentTypes["AssetHistory"],
> = ResolversObject<{
  assetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  asset?: Resolver<ResolversTypes["ExchangeTradedAsset"], ParentType, ContextType>
  history?: Resolver<Array<ResolversTypes["ValueAndQuantityAtTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CompanyStockResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CompanyStock"] = ResolversParentTypes["CompanyStock"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  sector?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  country?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CryptoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Crypto"] = ResolversParentTypes["Crypto"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
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
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
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
  createSettings?: Resolver<
    ResolversTypes["Settings"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSettingsArgs, "settings">
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
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  primary?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  access?: Resolver<Maybe<ResolversTypes["Access"]>, ParentType, ContextType>
  grantReadAccess?: Resolver<Array<ResolversTypes["ID"]>, ParentType, ContextType>
  transactions?: Resolver<Array<ResolversTypes["Transaction"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  getPortfolios?: Resolver<
    Array<ResolversTypes["Portfolio"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetPortfoliosArgs, "userId">
  >
  getPortfolio?: Resolver<
    ResolversTypes["Portfolio"],
    ParentType,
    ContextType,
    RequireFields<QueryGetPortfolioArgs, "portfolioId">
  >
  getPrimaryPortfolio?: Resolver<
    ResolversTypes["Portfolio"],
    ParentType,
    ContextType,
    RequireFields<QueryGetPrimaryPortfolioArgs, "userID">
  >
  getExchangeTradedAsset?: Resolver<
    Maybe<ResolversTypes["ExchangeTradedAsset"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetExchangeTradedAssetArgs, "id">
  >
  getExchanges?: Resolver<Array<ResolversTypes["Exchange"]>, ParentType, ContextType>
  getRelativePortfolioHistory?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetRelativePortfolioHistoryArgs, "portfolioId">
  >
  getPortfolioHistory?: Resolver<
    Array<ResolversTypes["AssetHistory"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetPortfolioHistoryArgs, "portfolioId">
  >
  getRiskFreeRates?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetRiskFreeRatesArgs, "interval" | "begin">
  >
  getStockPricesAtExchange?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetStockPricesAtExchangeArgs, "ticker" | "mic" | "start">
  >
  getTransactions?: Resolver<
    Array<ResolversTypes["Transaction"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetTransactionsArgs, "portfolioId">
  >
  getUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserArgs, "userId">
  >
  getSettings?: Resolver<
    Maybe<ResolversTypes["Settings"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetSettingsArgs, "userId">
  >
  search?: Resolver<
    Array<ResolversTypes["SearchResult"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchArgs, "fragment">
  >
}>

export type SearchResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SearchResult"] = ResolversParentTypes["SearchResult"],
> = ResolversObject<{
  assetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  asset?: Resolver<ResolversTypes["ExchangeTradedAsset"], ParentType, ContextType>
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
  assetId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  asset?: Resolver<ResolversTypes["ExchangeTradedAsset"], ParentType, ContextType>
  executedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  userId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  volume?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  mic?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  stripeCustomerId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  settings?: Resolver<Maybe<ResolversTypes["Settings"]>, ParentType, ContextType>
  portfolios?: Resolver<Array<ResolversTypes["Portfolio"]>, ParentType, ContextType>
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

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>

export type TransactionSchemaFragment = { __typename?: "Transaction" } & Pick<
  Transaction,
  "id" | "assetId" | "userId" | "executedAt" | "value" | "volume"
>

export type CreateTransactionMutationVariables = Exact<{
  transaction: CreateTransaction
}>

export type CreateTransactionMutation = { __typename?: "Mutation" } & {
  createTransaction?: Maybe<{ __typename?: "Transaction" } & Pick<Transaction, "id">>
}

export type CreateSettingsMutationVariables = Exact<{
  settings: CreateSettings
}>

export type CreateSettingsMutation = { __typename?: "Mutation" } & {
  createSettings: { __typename?: "Settings" } & Pick<Settings, "defaultCurrency"> & {
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

export type UpdateSettingsMutationVariables = Exact<{
  settings: UpdateSettings
}>

export type UpdateSettingsMutation = { __typename?: "Mutation" } & {
  updateSettings: { __typename?: "Settings" } & Pick<Settings, "defaultCurrency"> & {
      defaultExchange: { __typename?: "Exchange" } & Pick<Exchange, "mic">
    }
}

export type GetExchangeTradedAssetQueryVariables = Exact<{
  id: Scalars["ID"]
}>

export type GetExchangeTradedAssetQuery = { __typename?: "Query" } & {
  getExchangeTradedAsset?: Maybe<
    | ({ __typename: "CompanyStock" } & Pick<CompanyStock, "id" | "ticker" | "logo" | "name">)
    | ({ __typename: "Crypto" } & Pick<Crypto, "id" | "ticker" | "logo" | "name">)
  >
}

export type GetExchangesQueryVariables = Exact<{ [key: string]: never }>

export type GetExchangesQuery = { __typename?: "Query" } & {
  getExchanges: Array<
    { __typename: "Exchange" } & Pick<
      Exchange,
      "name" | "region" | "mic" | "suffix" | "abbreviation"
    >
  >
}

export type GetPortfolioQueryVariables = Exact<{
  portfolioId: Scalars["ID"]
}>

export type GetPortfolioQuery = { __typename?: "Query" } & {
  getPortfolio: { __typename: "Portfolio" } & Pick<Portfolio, "id" | "name" | "primary"> & {
      transactions: Array<{ __typename?: "Transaction" } & Pick<Transaction, "id">>
    }
}

export type GetPortfolioHistoryQueryVariables = Exact<{
  portfolioId: Scalars["String"]
}>

export type GetPortfolioHistoryQuery = { __typename?: "Query" } & {
  getPortfolioHistory: Array<
    { __typename?: "AssetHistory" } & Pick<AssetHistory, "assetId"> & {
        asset:
          | ({ __typename: "CompanyStock" } & Pick<
              CompanyStock,
              "sector" | "country" | "id" | "ticker" | "name" | "logo"
            >)
          | ({ __typename: "Crypto" } & Pick<Crypto, "id" | "ticker" | "name" | "logo">)
        history: Array<
          { __typename?: "ValueAndQuantityAtTime" } & Pick<
            ValueAndQuantityAtTime,
            "value" | "time" | "quantity"
          >
        >
      }
  >
}

export type GetRelativePortfolioHistoryQueryVariables = Exact<{
  portfolioId: Scalars["String"]
  since?: Maybe<Scalars["Int"]>
}>

export type GetRelativePortfolioHistoryQuery = { __typename?: "Query" } & {
  getRelativePortfolioHistory: Array<
    { __typename?: "ValueAtTime" } & Pick<ValueAtTime, "time" | "value">
  >
}

export type GetTransactionsQueryVariables = Exact<{
  portfolioId: Scalars["ID"]
}>

export type GetTransactionsQuery = { __typename?: "Query" } & {
  getTransactions: Array<
    { __typename: "Transaction" } & Pick<
      Transaction,
      "id" | "userId" | "executedAt" | "value" | "volume"
    > & {
        asset:
          | ({ __typename: "CompanyStock" } & Pick<CompanyStock, "id" | "ticker" | "logo" | "name">)
          | ({ __typename: "Crypto" } & Pick<Crypto, "id" | "ticker" | "logo" | "name">)
      }
  >
}

export type GetUserQueryVariables = Exact<{
  userId: Scalars["ID"]
}>

export type GetUserQuery = { __typename?: "Query" } & {
  getUser?: Maybe<{ __typename: "User" } & Pick<User, "id" | "email" | "stripeCustomerId">>
}

export type GetSettingsQueryVariables = Exact<{
  userId: Scalars["ID"]
}>

export type GetSettingsQuery = { __typename?: "Query" } & {
  getSettings?: Maybe<
    { __typename: "Settings" } & Pick<Settings, "defaultCurrency"> & {
        defaultExchange: { __typename: "Exchange" } & Pick<
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
    { __typename: "SearchResult" } & Pick<SearchResult, "isin"> & {
        asset:
          | ({ __typename: "CompanyStock" } & Pick<CompanyStock, "logo" | "ticker" | "name">)
          | ({ __typename: "Crypto" } & Pick<Crypto, "logo" | "ticker" | "name">)
      }
  >
}

export const TransactionSchemaFragmentDoc = gql`
  fragment TransactionSchema on Transaction {
    id
    assetId
    userId
    executedAt
    value
    volume
  }
`
export const CreateTransactionDocument = gql`
  mutation CreateTransaction($transaction: CreateTransaction!) {
    createTransaction(transaction: $transaction) {
      id
    }
  }
`
export const CreateSettingsDocument = gql`
  mutation CreateSettings($settings: CreateSettings!) {
    createSettings(settings: $settings) {
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
export const GetExchangeTradedAssetDocument = gql`
  query getExchangeTradedAsset($id: ID!) {
    getExchangeTradedAsset(id: $id) {
      __typename
      id
      ticker
      logo
      name
    }
  }
`
export const GetExchangesDocument = gql`
  query getExchanges {
    getExchanges {
      __typename
      name
      region
      mic
      suffix
      abbreviation
    }
  }
`
export const GetPortfolioDocument = gql`
  query getPortfolio($portfolioId: ID!) {
    getPortfolio(portfolioId: $portfolioId) {
      __typename
      id
      name
      primary
      transactions {
        id
      }
    }
  }
`
export const GetPortfolioHistoryDocument = gql`
  query getPortfolioHistory($portfolioId: String!) {
    getPortfolioHistory(portfolioId: $portfolioId) {
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
`
export const GetRelativePortfolioHistoryDocument = gql`
  query getRelativePortfolioHistory($portfolioId: String!, $since: Int) {
    getRelativePortfolioHistory(portfolioId: $portfolioId, since: $since) {
      time
      value
    }
  }
`
export const GetTransactionsDocument = gql`
  query getTransactions($portfolioId: ID!) {
    getTransactions(portfolioId: $portfolioId) {
      __typename
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
      userId
      executedAt
      value
      volume
    }
  }
`
export const GetUserDocument = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      __typename
      id
      email
      stripeCustomerId
    }
  }
`
export const GetSettingsDocument = gql`
  query getSettings($userId: ID!) {
    getSettings(userId: $userId) {
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
    CreateSettings(
      variables: CreateSettingsMutationVariables,
      options?: C,
    ): Promise<CreateSettingsMutation> {
      return requester<CreateSettingsMutation, CreateSettingsMutationVariables>(
        CreateSettingsDocument,
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
    getExchangeTradedAsset(
      variables: GetExchangeTradedAssetQueryVariables,
      options?: C,
    ): Promise<GetExchangeTradedAssetQuery> {
      return requester<GetExchangeTradedAssetQuery, GetExchangeTradedAssetQueryVariables>(
        GetExchangeTradedAssetDocument,
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
    getPortfolio(variables: GetPortfolioQueryVariables, options?: C): Promise<GetPortfolioQuery> {
      return requester<GetPortfolioQuery, GetPortfolioQueryVariables>(
        GetPortfolioDocument,
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
    getRelativePortfolioHistory(
      variables: GetRelativePortfolioHistoryQueryVariables,
      options?: C,
    ): Promise<GetRelativePortfolioHistoryQuery> {
      return requester<GetRelativePortfolioHistoryQuery, GetRelativePortfolioHistoryQueryVariables>(
        GetRelativePortfolioHistoryDocument,
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
    getUser(variables: GetUserQueryVariables, options?: C): Promise<GetUserQuery> {
      return requester<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options)
    },
    getSettings(variables: GetSettingsQueryVariables, options?: C): Promise<GetSettingsQuery> {
      return requester<GetSettingsQuery, GetSettingsQueryVariables>(
        GetSettingsDocument,
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
