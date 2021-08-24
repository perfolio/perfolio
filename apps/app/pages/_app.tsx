import type { AppProps } from "next/app"
import { QueryClientProvider } from "react-query"
import { PersistendQueryClient } from "@perfolio/app/query-client"
import Head from "next/head"
import { OnboardingModal } from "@perfolio/app/middleware"
import { IdProvider } from "@radix-ui/react-id"

import { ToastProvider } from "@perfolio/toaster"
import "tailwindcss/tailwind.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Perfolio</title>
      </Head>

      <IdProvider>
        <ToastProvider>
          <QueryClientProvider client={PersistendQueryClient()}>
            <OnboardingModal />
            <div className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
              <Component {...pageProps} />
            </div>
          </QueryClientProvider>
        </ToastProvider>
      </IdProvider>
    </>
  )
}
export default MyApp
