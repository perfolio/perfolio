import { env } from "@chronark/env"
import { Cache } from "./cache"
import { ResolverFn } from "@perfolio/api/graphql"
import { Key, Value } from "./key"
export class ApolloCache extends Cache {
  constructor() {
    super(env.require("APOLLO_REDIS_CONNECTION"))
  }
}

export function cachedResolver<TResult extends Value, TParent, TContext, TArgs>(
  ttl: string,
  resolver: ResolverFn<TResult, TParent, TContext, TArgs>,
): ResolverFn<TResult, TParent, TContext, TArgs> {
  return async (parent, args, ctx, info) => {
    const cache = new ApolloCache()
    const path = info.path
    const key = new Key({ path, args })

    const cached = await cache.get<TResult>(key)
    if (cached) {
      return cached
    }

    const value = await resolver(parent, args, ctx, info)
    await cache.set(ttl, { key, value })
    return value
  }
}
