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

export type Portfolio = {
  __typename?: "Portfolio"
  /** unique id */
  id: Scalars["ID"]
  /** Human readable name for the portfolio */
  name: Scalars["String"]
  /** The primary portfolio will be displayed by default */
  primary: Scalars["Boolean"]
  /** The owner of this portfolio */
  user: User
}

export type Query = {
  __typename?: "Query"
  user?: Maybe<User>
}

export type QueryUserArgs = {
  id: Scalars["ID"]
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  portfolio?: Maybe<Portfolio>
  portfolios: Array<Portfolio>
}

export type UserPortfolioArgs = {
  portfolioId: Scalars["ID"]
}

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
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  Portfolio: ResolverTypeWrapper<PortfolioModel>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars["String"]>
  User: ResolverTypeWrapper<UserModel>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]
  ID: Scalars["ID"]
  Portfolio: PortfolioModel
  Query: {}
  String: Scalars["String"]
  User: UserModel
}

export type PortfolioResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Portfolio"] = ResolversParentTypes["Portfolio"],
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  primary?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >
}

export type UserResolvers<
  ContextType = GraphQLModules.Context,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  portfolio?: Resolver<
    Maybe<ResolversTypes["Portfolio"]>,
    ParentType,
    ContextType,
    RequireFields<UserPortfolioArgs, "portfolioId">
  >
  portfolios?: Resolver<Array<ResolversTypes["Portfolio"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = GraphQLModules.Context> = {
  Portfolio?: PortfolioResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
export function getSdk<C>(requester: Requester<C>) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
