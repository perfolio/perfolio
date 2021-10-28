import { QueryClient } from "react-query"
import { persistQueryClient } from "react-query/persistQueryClient-experimental"
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental"
export const PersistendQueryClient = (): QueryClient => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10_000,
      },
    },
  })

  const enabled = true
  /**
   * We obviously cannot use a localstorage persistor serverside.
   */
  if (enabled && typeof window !== "undefined") {
    persistQueryClient({
      queryClient,
      persistor: createWebStoragePersistor({ storage: window.localStorage }),
      /**
       * A new deployment will invalidate the cache
       */
      buster: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    })
  }
  return queryClient
}
