import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Company = {
  __typename?: 'Company';
  /** Ticker of the company */
  ticker: Scalars['String'];
  /** Url of the logo */
  logo: Scalars['String'];
  /** Name of the company */
  name?: Maybe<Scalars['String']>;
  /**
   * Refers to Exchange using IEX Supported Exchanges list
   * @see https://cloud.iexapis.com/stable/ref-data/exchanges
   */
  exchange?: Maybe<Scalars['String']>;
  /** Refers to the industry the company belongs to */
  industry?: Maybe<Scalars['String']>;
  /** Website of the company */
  website?: Maybe<Scalars['String']>;
  /** Description for the company */
  description?: Maybe<Scalars['String']>;
  /** Name of the CEO of the company */
  ceo?: Maybe<Scalars['String']>;
  /** Refers to the common issue type of the stock. */
  issueType?: Maybe<IssueType>;
  /** Refers to the sector the company belongs to. */
  sector?: Maybe<Scalars['String']>;
  /** Number of employees */
  employees?: Maybe<Scalars['Int']>;
  /** Name of the CEO of the company */
  securityName?: Maybe<Scalars['String']>;
  /**
   * Primary SIC Code for the ticker (if available)
   * @see https://en.wikipedia.org/wiki/Standard_Industrial_Classification
   */
  primarySicCode?: Maybe<Scalars['Int']>;
  /** An array of Strings used to classify the company. */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Street address of the company if available */
  address?: Maybe<Scalars['String']>;
  /** Street address of the company if available */
  address2?: Maybe<Scalars['String']>;
  /** State of the company if available */
  state?: Maybe<Scalars['String']>;
  /** City of the company if available */
  city?: Maybe<Scalars['String']>;
  /** Zip code of the company if available */
  zip?: Maybe<Scalars['String']>;
  /** Country of the company if available */
  country?: Maybe<Scalars['String']>;
  /** Phone Number of the company if available */
  phone?: Maybe<Scalars['String']>;
};

export enum Interval {
  Daily = 'daily',
  Monthly = 'monthly',
  Annual = 'annual'
}

export enum IssueType {
  /** ADR */
  Ad = 'ad',
  /** Common Stock */
  Cs = 'cs',
  /** Closed End Fund */
  Cef = 'cef',
  /** ETF */
  Et = 'et',
  /** Open Ended Fund */
  Oef = 'oef',
  /** Preferred Stock */
  Ps = 'ps',
  /** Right */
  Rt = 'rt',
  /** Structured Product */
  Struct = 'struct',
  /** Unit */
  Ut = 'ut',
  /** When Issued */
  Wi = 'wi',
  /** Warrant */
  Wt = 'wt',
  /** Other */
  Empty = 'empty'
}

export type Query = {
  __typename?: 'Query';
  getRiskFreeRates: Array<RiskFreeRate>;
  getCompany?: Maybe<Company>;
};


export type QueryGetRiskFreeRatesArgs = {
  interval: Interval;
};


export type QueryGetCompanyArgs = {
  ticker: Scalars['String'];
};

/**
 * The risk free rate from the european central bank
 *
 * This was meant to be a map with a time as key and the rate as value
 * but graphql does not handle maps.
 */
export type RiskFreeRate = {
  __typename?: 'RiskFreeRate';
  /** Time */
  key: Scalars['String'];
  /** Rate */
  value: Scalars['Float'];
};

export type GetCompanyQueryVariables = Exact<{
  ticker: Scalars['String'];
}>;


export type GetCompanyQuery = (
  { __typename?: 'Query' }
  & { getCompany?: Maybe<(
    { __typename?: 'Company' }
    & Pick<Company, 'ticker'>
  )> }
);



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CacheControlScope: CacheControlScope;
  Company: ResolverTypeWrapper<Company>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Interval: Interval;
  IssueType: IssueType;
  Query: ResolverTypeWrapper<{}>;
  RiskFreeRate: ResolverTypeWrapper<RiskFreeRate>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Company: Company;
  String: Scalars['String'];
  Int: Scalars['Int'];
  Query: {};
  RiskFreeRate: RiskFreeRate;
  Float: Scalars['Float'];
  Boolean: Scalars['Boolean'];
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  ticker?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exchange?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  industry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ceo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  issueType?: Resolver<Maybe<ResolversTypes['IssueType']>, ParentType, ContextType>;
  sector?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employees?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  securityName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primarySicCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getRiskFreeRates?: Resolver<Array<ResolversTypes['RiskFreeRate']>, ParentType, ContextType, RequireFields<QueryGetRiskFreeRatesArgs, 'interval'>>;
  getCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<QueryGetCompanyArgs, 'ticker'>>;
};

export type RiskFreeRateResolvers<ContextType = any, ParentType extends ResolversParentTypes['RiskFreeRate'] = ResolversParentTypes['RiskFreeRate']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Company?: CompanyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RiskFreeRate?: RiskFreeRateResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;

export const GetCompanyDocument = gql`
    query getCompany($ticker: String!) {
  getCompany(ticker: $ticker) {
    ticker
  }
}
    `;

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
 *   },
 * });
 */
export function useGetCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyQuery, GetCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, options);
      }
export function useGetCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyQuery, GetCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, options);
        }
export type GetCompanyQueryHookResult = ReturnType<typeof useGetCompanyQuery>;
export type GetCompanyLazyQueryHookResult = ReturnType<typeof useGetCompanyLazyQuery>;
export type GetCompanyQueryResult = Apollo.QueryResult<GetCompanyQuery, GetCompanyQueryVariables>;