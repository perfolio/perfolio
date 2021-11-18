import { QueryClient, } from "react-query"
import { persistQueryClient, } from "react-query/persistQueryClient-experimental"

import { createWebStoragePersistor, } from "react-query/createWebStoragePersistor-experimental"
import { QUERIES_KEY, } from "./keys"

/**
 * EXPERIMENTAL!
 * [https://react-query.tanstack.com/plugins/persistQueryClient](https://react-query.tanstack.com/plugins/persistQueryClient)
 *
 * Persists queries to localstorage to cache chart data on the client.
 */
export const PersistentQueryClient = (): QueryClient => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * Cached data is stale revalidated and displayed till new data arrives
         * prod: 24h
         * rest: 1h
         */
        cacheTime: process.env.NODE_ENV === "production" ? 24 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000,
        /**
         * Stale data will not be refetched
         * prod: 1h
         * rest: 1min
         */
        staleTime: process.env.NODE_ENV === "production" ? 60 * 60 * 1000 : 1 * 60 * 1000,
      },
    },
  },)
  /**
   * Persist queries in localstorage can only work in the browser
   */
  if (typeof window !== "undefined") {
    const localStoragePersistor = createWebStoragePersistor({
      storage: window?.localStorage,
      key: QUERIES_KEY,
    },)
    persistQueryClient({ queryClient: client, persistor: localStoragePersistor, },)
  }
  return client
}
