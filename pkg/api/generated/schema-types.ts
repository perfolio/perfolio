import { GraphQLResolveInfo } from "graphql"
import {
  UserModel,
  PortfolioModel,
  SettingsModel,
  TransactionModel,
  ExchangeTradedAssetModel,
} from "@perfolio/pkg/integrations/prisma"
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
}

export type AbsoluteAssetHistory = {
  __typename?: "AbsoluteAssetHistory"
  asset: Asset
  assetId: Scalars["ID"]
  history: Array<ValueAndQuantityAtTime>
}

/** Common fields on all assets */
export type Asset = {
  /** Globally unique id */
  id: Scalars["ID"]
  /** Human readable name */
  name: Scalars["String"]
}

export type AssetType = "COMMON_STOCK" | "CRYPTO" | "MUTUAL_FUND" | "TODO"

export type CacheControlScope = "PRIVATE" | "PUBLIC"

/** Company stocks */
export type Company = Asset &
  ExchangeTradedAsset &
  Stock & {
    __typename?: "Company"
    /** The asset value over time at a specific exchange */
    assetHistory: Array<ValueAtTime>
    /** The country where this company is registered */
    country: Scalars["String"]
    /** Financial Instrument Global Identifier */
    figi?: Maybe<Scalars["String"]>
    /** A globally unique id */
    id: Scalars["ID"]
    /** International Securities Identification Number */
    isin: Scalars["String"]
    /** URL to the logo or image */
    logo: Scalars["String"]
    /** Human readable name */
    name: Scalars["String"]
    /** The sector of this company */
    sector: Scalars["String"]
    /** The ticker as used by the exchanges. */
    ticker: Scalars["String"]
    /** The type of asset */
    type: AssetType
  }

/** Company stocks */
export type CompanyAssetHistoryArgs = {
  end?: Maybe<Scalars["Int"]>
  mic: Scalars["ID"]
  start?: Maybe<Scalars["Int"]>
}

export type CreatePortfolio = {
  name: Scalars["String"]
  primary?: Maybe<Scalars["Boolean"]>
  userId: Scalars["ID"]
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
  defaultExchangeId: Scalars["ID"]
  /** The unique user id */
  userId: Scalars["ID"]
}

export type CreateTransaction = {
  /** Reference to the actual asset */
  assetId: Scalars["String"]
  /** A timestamp when the transaction was executed in unix time */
  executedAt: Scalars["Int"]
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

/** Crypto */
export type Crypto = Asset &
  ExchangeTradedAsset & {
    __typename?: "Crypto"
    /** The asset value over time at a specific exchange */
    assetHistory: Array<ValueAtTime>
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
    /** The type of asset */
    type: AssetType
  }

/** Crypto */
export type CryptoAssetHistoryArgs = {
  end?: Maybe<Scalars["Int"]>
  mic: Scalars["ID"]
  start?: Maybe<Scalars["Int"]>
}

/** Company stocks */
export type Etf = Asset &
  ExchangeTradedAsset &
  Stock & {
    __typename?: "ETF"
    /** The asset value over time at a specific exchange */
    assetHistory: Array<ValueAtTime>
    /** Financial Instrument Global Identifier */
    figi?: Maybe<Scalars["String"]>
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
    /** The type of asset */
    type: AssetType
  }

/** Company stocks */
export type EtfAssetHistoryArgs = {
  end?: Maybe<Scalars["Int"]>
  mic: Scalars["ID"]
  start?: Maybe<Scalars["Int"]>
}

/** An exchange where shares are traded */
export type Exchange = {
  __typename?: "Exchange"
  /** Full name of the exchange. */
  description: Scalars["String"]
  /** "    Market Identifier Code using ISO 10383 */
  mic: Scalars["ID"]
  /** 2 letter case insensitive string of country codes using ISO 3166-1 alpha-2 */
  region: Scalars["String"]
  /** Exchange Suffix to be added for symbols on that exchange */
  suffix?: Maybe<Scalars["String"]>
}

/** A sub type of assets that are all traded at exchanges */
export type ExchangeTradedAsset = {
  /** The asset value over time at a specific exchange */
  assetHistory: Array<ValueAtTime>
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
  /** The type of asset */
  type: AssetType
}

/** A sub type of assets that are all traded at exchanges */
export type ExchangeTradedAssetAssetHistoryArgs = {
  end?: Maybe<Scalars["Int"]>
  mic: Scalars["ID"]
  start?: Maybe<Scalars["Int"]>
}

export type Mutation = {
  __typename?: "Mutation"
  _empty?: Maybe<Scalars["Boolean"]>
  /** Clone a portfolio with all its transactions and return the clone */
  clonePortfolio: Portfolio
  createExchangeTradedAsset?: Maybe<ExchangeTradedAsset>
  createPortfolio: Portfolio
  createSettings: Settings
  createTransaction: Transaction
  deletePortfolio: Portfolio
  deleteTransaction: Transaction
  refresh: Scalars["String"]
  signIn?: Maybe<Scalars["Boolean"]>
  subscribeToNewsletter?: Maybe<Scalars["Boolean"]>
  updatePortfolio: Portfolio
  /** Only update some values in the user settings. */
  updateSettings: Settings
  updateTransaction: Transaction
}

export type MutationClonePortfolioArgs = {
  portfolioId: Scalars["ID"]
}

export type MutationCreateExchangeTradedAssetArgs = {
  isin: Scalars["String"]
}

export type MutationCreatePortfolioArgs = {
  portfolio: CreatePortfolio
}

export type MutationCreateSettingsArgs = {
  settings: CreateSettings
}

export type MutationCreateTransactionArgs = {
  transaction: CreateTransaction
}

export type MutationDeletePortfolioArgs = {
  portfolioId: Scalars["ID"]
}

export type MutationDeleteTransactionArgs = {
  transactionId: Scalars["ID"]
}

export type MutationRefreshArgs = {
  didToken: Scalars["String"]
}

export type MutationSignInArgs = {
  didToken: Scalars["String"]
}

export type MutationSubscribeToNewsletterArgs = {
  email: Scalars["String"]
}

export type MutationUpdatePortfolioArgs = {
  portfolio: UpdatePortfolio
}

export type MutationUpdateSettingsArgs = {
  settings: UpdateSettings
}

export type MutationUpdateTransactionArgs = {
  transaction: UpdateTransaction
}

export type Portfolio = {
  __typename?: "Portfolio"
  /**
   * Returns a history for each asset. This is not the absolute asset value but rather what
   * each asset is worth at each point in time at the given exchange
   */
  absoluteHistory: Array<AbsoluteAssetHistory>
  /** unique id */
  id: Scalars["ID"]
  /** Human readable name for the portfolio */
  name: Scalars["String"]
  /** The primary portfolio will be displayed by default */
  primary: Scalars["Boolean"]
  /** Return an index for the performance of the users portfolio */
  relativeHistory: Array<ValueAtTime>
  transactions: Array<Transaction>
  /** The owner of this portfolio */
  user: User
}

export type PortfolioAbsoluteHistoryArgs = {
  since?: Maybe<Scalars["Int"]>
}

export type PortfolioRelativeHistoryArgs = {
  since?: Maybe<Scalars["Int"]>
}

export type Query = {
  __typename?: "Query"
  exchangeTradedAsset?: Maybe<ExchangeTradedAsset>
  /**
   * "
   * Get a list of all availale exchanges
   */
  exchanges: Array<Exchange>
  healthCheck: Scalars["Boolean"]
  /** Return a portfolio by its id */
  portfolio?: Maybe<Portfolio>
  search: Array<ExchangeTradedAsset>
  user?: Maybe<User>
}

export type QueryExchangeTradedAssetArgs = {
  assetId: Scalars["ID"]
}

export type QueryPortfolioArgs = {
  portfolioId: Scalars["ID"]
}

export type QuerySearchArgs = {
  fragment: Scalars["String"]
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
  assetHistory: Array<ValueAtTime>
  /** Financial Instrument Global Identifier */
  figi?: Maybe<Scalars["String"]>
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
  /** The type of asset */
  type: AssetType
}

/** Stocks such as company shares and funds. */
export type StockAssetHistoryArgs = {
  end?: Maybe<Scalars["Int"]>
  mic: Scalars["ID"]
  start?: Maybe<Scalars["Int"]>
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

export type UpdatePortfolio = {
  id: Scalars["ID"]
  name?: Maybe<Scalars["String"]>
  primary?: Maybe<Scalars["Boolean"]>
}

/** Update only some values. */
export type UpdateSettings = {
  /** The user's default currency. Everything will be converted to this currency. */
  defaultCurrency?: Maybe<Scalars["String"]>
  /**
   * The user's default exchange. At the start only 1 exchange can be used.
   * This must be the MIC!
   */
  defaultExchangeId?: Maybe<Scalars["ID"]>
  /** The unique user id */
  userId: Scalars["ID"]
}

export type UpdateTransaction = {
  /** Reference to the actual asset */
  assetId?: Maybe<Scalars["String"]>
  /** A timestamp when the transaction was executed in unix time */
  executedAt?: Maybe<Scalars["Int"]>
  id: Scalars["ID"]
  /** The market identifier code where the user intends to sell this asset */
  mic?: Maybe<Scalars["String"]>
  /** The portfolio of this transaction */
  portfolioId?: Maybe<Scalars["ID"]>
  /** How much each share/item was bought/sold for */
  value?: Maybe<Scalars["Float"]>
  /**
   * How many shares/items the user bought or sold
   * negative if sold
   */
  volume?: Maybe<Scalars["Float"]>
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
  AbsoluteAssetHistory: ResolverTypeWrapper<AbsoluteAssetHistory>
  Asset: ResolversTypes["Company"] | ResolversTypes["Crypto"] | ResolversTypes["ETF"]
  AssetType: AssetType
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  CacheControlScope: CacheControlScope
  Company: ResolverTypeWrapper<Company>
  CreatePortfolio: CreatePortfolio
  CreateSettings: CreateSettings
  CreateTransaction: CreateTransaction
  Crypto: ResolverTypeWrapper<Crypto>
  ETF: ResolverTypeWrapper<Etf>
  Exchange: ResolverTypeWrapper<Exchange>
  ExchangeTradedAsset: ResolverTypeWrapper<ExchangeTradedAssetModel>
  Float: ResolverTypeWrapper<Scalars["Float"]>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  Mutation: ResolverTypeWrapper<{}>
  Portfolio: ResolverTypeWrapper<PortfolioModel>
  Query: ResolverTypeWrapper<{}>
  Settings: ResolverTypeWrapper<SettingsModel>
  Stock: ResolversTypes["Company"] | ResolversTypes["ETF"]
  String: ResolverTypeWrapper<Scalars["String"]>
  Transaction: ResolverTypeWrapper<TransactionModel>
  UpdatePortfolio: UpdatePortfolio
  UpdateSettings: UpdateSettings
  UpdateTransaction: UpdateTransaction
  User: ResolverTypeWrapper<UserModel>
  ValueAndQuantityAtTime: ResolverTypeWrapper<ValueAndQuantityAtTime>
  ValueAtTime: ResolverTypeWrapper<ValueAtTime>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AbsoluteAssetHistory: AbsoluteAssetHistory
  Asset:
    | ResolversParentTypes["Company"]
    | ResolversParentTypes["Crypto"]
    | ResolversParentTypes["ETF"]
  Boolean: Scalars["Boolean"]
  Company: Company
  CreatePortfolio: CreatePortfolio
  CreateSettings: CreateSettings
  CreateTransaction: CreateTransaction
  Crypto: Crypto
  ETF: Etf
  Exchange: Exchange
  ExchangeTradedAsset: ExchangeTradedAssetModel
  Float: Scalars["Float"]
  ID: Scalars["ID"]
  Int: Scalars["Int"]
  Mutation: {}
  Portfolio: PortfolioModel
  Query: {}
  Settings: SettingsModel
  Stock: ResolversParentTypes["Company"] | ResolversParentTypes["ETF"]
  String: Scalars["String"]
  Transaction: TransactionModel
  UpdatePortfolio: UpdatePortfolio
  UpdateSettings: UpdateSettings
  UpdateTransaction: UpdateTransaction
  User: UserModel
  ValueAndQuantityAtTime: ValueAndQuantityAtTime
  ValueAtTime: ValueAtTime
}>

export type CacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars["Boolean"]>
  maxAge?: Maybe<Scalars["Int"]>
  scope?: Maybe<CacheControlScope>
}

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = GraphQLModules.Context,
  Args = CacheControlDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AbsoluteAssetHistoryResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["AbsoluteAssetHistory"] = ResolversParentTypes["AbsoluteAssetHistory"],
> = ResolversObject<{
  asset?: Resolver<ResolversTypes["Asset"], ParentType, ContextType>
  assetId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  history?: Resolver<Array<ResolversTypes["ValueAndQuantityAtTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type AssetResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Asset"] = ResolversParentTypes["Asset"],
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Company" | "Crypto" | "ETF", ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
}>

export type CompanyResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Company"] = ResolversParentTypes["Company"],
> = ResolversObject<{
  assetHistory?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<CompanyAssetHistoryArgs, "mic">
  >
  country?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  figi?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  sector?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  type?: Resolver<ResolversTypes["AssetType"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CryptoResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Crypto"] = ResolversParentTypes["Crypto"],
> = ResolversObject<{
  assetHistory?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<CryptoAssetHistoryArgs, "mic">
  >
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  type?: Resolver<ResolversTypes["AssetType"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type EtfResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["ETF"] = ResolversParentTypes["ETF"],
> = ResolversObject<{
  assetHistory?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<EtfAssetHistoryArgs, "mic">
  >
  figi?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  type?: Resolver<ResolversTypes["AssetType"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ExchangeResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Exchange"] = ResolversParentTypes["Exchange"],
> = ResolversObject<{
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  mic?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  region?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  suffix?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ExchangeTradedAssetResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["ExchangeTradedAsset"] = ResolversParentTypes["ExchangeTradedAsset"],
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Company" | "Crypto" | "ETF", ParentType, ContextType>
  assetHistory?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<ExchangeTradedAssetAssetHistoryArgs, "mic">
  >
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  type?: Resolver<ResolversTypes["AssetType"], ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>
  clonePortfolio?: Resolver<
    ResolversTypes["Portfolio"],
    ParentType,
    ContextType,
    RequireFields<MutationClonePortfolioArgs, "portfolioId">
  >
  createExchangeTradedAsset?: Resolver<
    Maybe<ResolversTypes["ExchangeTradedAsset"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateExchangeTradedAssetArgs, "isin">
  >
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
    ResolversTypes["Transaction"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTransactionArgs, "transaction">
  >
  deletePortfolio?: Resolver<
    ResolversTypes["Portfolio"],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePortfolioArgs, "portfolioId">
  >
  deleteTransaction?: Resolver<
    ResolversTypes["Transaction"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTransactionArgs, "transactionId">
  >
  refresh?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<MutationRefreshArgs, "didToken">
  >
  signIn?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, "didToken">
  >
  subscribeToNewsletter?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSubscribeToNewsletterArgs, "email">
  >
  updatePortfolio?: Resolver<
    ResolversTypes["Portfolio"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePortfolioArgs, "portfolio">
  >
  updateSettings?: Resolver<
    ResolversTypes["Settings"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSettingsArgs, "settings">
  >
  updateTransaction?: Resolver<
    ResolversTypes["Transaction"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTransactionArgs, "transaction">
  >
}>

export type PortfolioResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Portfolio"] = ResolversParentTypes["Portfolio"],
> = ResolversObject<{
  absoluteHistory?: Resolver<
    Array<ResolversTypes["AbsoluteAssetHistory"]>,
    ParentType,
    ContextType,
    RequireFields<PortfolioAbsoluteHistoryArgs, never>
  >
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
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  exchangeTradedAsset?: Resolver<
    Maybe<ResolversTypes["ExchangeTradedAsset"]>,
    ParentType,
    ContextType,
    RequireFields<QueryExchangeTradedAssetArgs, "assetId">
  >
  exchanges?: Resolver<Array<ResolversTypes["Exchange"]>, ParentType, ContextType>
  healthCheck?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  portfolio?: Resolver<
    Maybe<ResolversTypes["Portfolio"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPortfolioArgs, "portfolioId">
  >
  search?: Resolver<
    Array<ResolversTypes["ExchangeTradedAsset"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchArgs, "fragment">
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
  __resolveType: TypeResolveFn<"Company" | "ETF", ParentType, ContextType>
  assetHistory?: Resolver<
    Array<ResolversTypes["ValueAtTime"]>,
    ParentType,
    ContextType,
    RequireFields<StockAssetHistoryArgs, "mic">
  >
  figi?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isin?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  logo?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ticker?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  type?: Resolver<ResolversTypes["AssetType"], ParentType, ContextType>
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
  AbsoluteAssetHistory?: AbsoluteAssetHistoryResolvers<ContextType>
  Asset?: AssetResolvers<ContextType>
  Company?: CompanyResolvers<ContextType>
  Crypto?: CryptoResolvers<ContextType>
  ETF?: EtfResolvers<ContextType>
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

export type DirectiveResolvers<ContextType = GraphQLModules.Context> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>
}>

export type CreateExchangeTradedAssetMutationVariables = Exact<{
  isin: Scalars["String"]
}>

export type CreateExchangeTradedAssetMutation = {
  __typename?: "Mutation"
  createExchangeTradedAsset?:
    | { __typename?: "Company"; id: string }
    | { __typename?: "Crypto"; id: string }
    | { __typename?: "ETF"; id: string }
    | null
    | undefined
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
  createTransaction: { __typename?: "Transaction"; id: string }
}

export type DeletePortfolioMutationVariables = Exact<{
  portfolioId: Scalars["ID"]
}>

export type DeletePortfolioMutation = {
  __typename?: "Mutation"
  deletePortfolio: { __typename?: "Portfolio"; id: string }
}

export type DeleteTransactionMutationVariables = Exact<{
  transactionId: Scalars["ID"]
}>

export type DeleteTransactionMutation = {
  __typename?: "Mutation"
  deleteTransaction: { __typename?: "Transaction"; id: string }
}

export type RefreshMutationVariables = Exact<{
  didToken: Scalars["String"]
}>

export type RefreshMutation = { __typename?: "Mutation"; refresh: string }

export type SignInMutationVariables = Exact<{
  didToken: Scalars["String"]
}>

export type SignInMutation = { __typename?: "Mutation"; signIn?: boolean | null | undefined }

export type SubscribeToNewsletterMutationVariables = Exact<{
  email: Scalars["String"]
}>

export type SubscribeToNewsletterMutation = {
  __typename?: "Mutation"
  subscribeToNewsletter?: boolean | null | undefined
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

export type AssetHistoryQueryVariables = Exact<{
  assetId: Scalars["ID"]
  mic: Scalars["ID"]
  start?: Maybe<Scalars["Int"]>
  end?: Maybe<Scalars["Int"]>
}>

export type AssetHistoryQuery = {
  __typename?: "Query"
  exchangeTradedAsset?:
    | {
        __typename: "Company"
        assetHistory: Array<{ __typename?: "ValueAtTime"; time: number; value: number }>
      }
    | {
        __typename: "Crypto"
        assetHistory: Array<{ __typename?: "ValueAtTime"; time: number; value: number }>
      }
    | {
        __typename: "ETF"
        assetHistory: Array<{ __typename?: "ValueAtTime"; time: number; value: number }>
      }
    | null
    | undefined
}

export type ExchangeTradedAssetQueryVariables = Exact<{
  assetId: Scalars["ID"]
}>

export type ExchangeTradedAssetQuery = {
  __typename?: "Query"
  exchangeTradedAsset?:
    | { __typename: "Company"; id: string; ticker: string; logo: string; name: string }
    | { __typename: "Crypto"; id: string; ticker: string; logo: string; name: string }
    | { __typename: "ETF"; id: string; ticker: string; logo: string; name: string }
    | null
    | undefined
}

export type ExchangesQueryVariables = Exact<{ [key: string]: never }>

export type ExchangesQuery = {
  __typename?: "Query"
  exchanges: Array<{
    __typename: "Exchange"
    description: string
    region: string
    mic: string
    suffix?: string | null | undefined
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
          assetId: string
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
            | {
                __typename: "ETF"
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

export type PortfolioHistoryQueryVariables = Exact<{
  portfolioId: Scalars["ID"]
  since?: Maybe<Scalars["Int"]>
}>

export type PortfolioHistoryQuery = {
  __typename?: "Query"
  portfolio?:
    | {
        __typename?: "Portfolio"
        relativeHistory: Array<{ __typename?: "ValueAtTime"; time: number; value: number }>
        absoluteHistory: Array<{
          __typename?: "AbsoluteAssetHistory"
          assetId: string
          asset:
            | {
                __typename: "Company"
                sector: string
                country: string
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
            | {
                __typename: "ETF"
                ticker: string
                isin: string
                logo: string
                id: string
                name: string
              }
          history: Array<{
            __typename?: "ValueAndQuantityAtTime"
            time: number
            value: number
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

export type SearchQueryVariables = Exact<{
  fragment: Scalars["String"]
}>

export type SearchQuery = {
  __typename?: "Query"
  search: Array<
    | {
        __typename: "Company"
        id: string
        isin: string
        name: string
        ticker: string
        logo: string
      }
    | { __typename: "Crypto"; id: string; isin: string; name: string; ticker: string; logo: string }
    | { __typename: "ETF"; id: string; isin: string; name: string; ticker: string; logo: string }
  >
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
            description: string
            suffix?: string | null | undefined
            mic: string
            region: string
          }
        }
      }
    | null
    | undefined
}

export const CreateExchangeTradedAssetDocument = gql`
  mutation createExchangeTradedAsset($isin: String!) {
    createExchangeTradedAsset(isin: $isin) {
      id
    }
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
export const DeletePortfolioDocument = gql`
  mutation deletePortfolio($portfolioId: ID!) {
    deletePortfolio(portfolioId: $portfolioId) {
      id
    }
  }
`
export const DeleteTransactionDocument = gql`
  mutation deleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      id
    }
  }
`
export const RefreshDocument = gql`
  mutation refresh($didToken: String!) {
    refresh(didToken: $didToken)
  }
`
export const SignInDocument = gql`
  mutation signIn($didToken: String!) {
    signIn(didToken: $didToken)
  }
`
export const SubscribeToNewsletterDocument = gql`
  mutation subscribeToNewsletter($email: String!) {
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
export const AssetHistoryDocument = gql`
  query assetHistory($assetId: ID!, $mic: ID!, $start: Int, $end: Int) {
    exchangeTradedAsset(assetId: $assetId) {
      __typename
      assetHistory(mic: $mic, start: $start, end: $end) {
        time
        value
      }
    }
  }
`
export const ExchangeTradedAssetDocument = gql`
  query exchangeTradedAsset($assetId: ID!) {
    exchangeTradedAsset(assetId: $assetId) {
      __typename
      id
      ticker
      logo
      name
      ... on Stock {
        ... on Company {
          sector
          country
        }
      }
    }
  }
`
export const ExchangesDocument = gql`
  query exchanges {
    exchanges {
      __typename
      description
      region
      mic
      suffix
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
        portfolioId
        assetId
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
              ... on Company {
                sector
                country
              }
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
export const PortfolioHistoryDocument = gql`
  query portfolioHistory($portfolioId: ID!, $since: Int) {
    portfolio(portfolioId: $portfolioId) {
      relativeHistory(since: $since) {
        time
        value
      }
      absoluteHistory(since: $since) {
        assetId
        asset {
          __typename
          id
          name
          ... on Company {
            sector
            country
            ticker
            isin
            logo
          }
          ... on ExchangeTradedAsset {
            ticker
            isin
            logo
          }
        }
        history {
          time
          value
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
export const SearchDocument = gql`
  query search($fragment: String!) {
    search(fragment: $fragment) {
      __typename
      id
      isin
      name
      ticker
      logo
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
          description
          suffix
          mic
          region
        }
      }
    }
  }
`
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    createExchangeTradedAsset(
      variables: CreateExchangeTradedAssetMutationVariables,
      options?: C,
    ): Promise<CreateExchangeTradedAssetMutation> {
      return requester<
        CreateExchangeTradedAssetMutation,
        CreateExchangeTradedAssetMutationVariables
      >(CreateExchangeTradedAssetDocument, variables, options)
    },
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
    deletePortfolio(
      variables: DeletePortfolioMutationVariables,
      options?: C,
    ): Promise<DeletePortfolioMutation> {
      return requester<DeletePortfolioMutation, DeletePortfolioMutationVariables>(
        DeletePortfolioDocument,
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
    refresh(variables: RefreshMutationVariables, options?: C): Promise<RefreshMutation> {
      return requester<RefreshMutation, RefreshMutationVariables>(
        RefreshDocument,
        variables,
        options,
      )
    },
    signIn(variables: SignInMutationVariables, options?: C): Promise<SignInMutation> {
      return requester<SignInMutation, SignInMutationVariables>(SignInDocument, variables, options)
    },
    subscribeToNewsletter(
      variables: SubscribeToNewsletterMutationVariables,
      options?: C,
    ): Promise<SubscribeToNewsletterMutation> {
      return requester<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>(
        SubscribeToNewsletterDocument,
        variables,
        options,
      )
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
    assetHistory(variables: AssetHistoryQueryVariables, options?: C): Promise<AssetHistoryQuery> {
      return requester<AssetHistoryQuery, AssetHistoryQueryVariables>(
        AssetHistoryDocument,
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
    search(variables: SearchQueryVariables, options?: C): Promise<SearchQuery> {
      return requester<SearchQuery, SearchQueryVariables>(SearchDocument, variables, options)
    },
    user(variables: UserQueryVariables, options?: C): Promise<UserQuery> {
      return requester<UserQuery, UserQueryVariables>(UserDocument, variables, options)
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
