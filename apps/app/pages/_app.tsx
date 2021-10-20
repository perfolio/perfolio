import type { AppProps } from "next/app"
import { QueryClientProvider } from "react-query"
import { PersistendQueryClient } from "@perfolio/app/query-client"
import Head from "next/head"
import { IdProvider } from "@radix-ui/react-id"
import { I18nProvider } from "@perfolio/feature/i18n"
import { ToastProvider } from "@perfolio/toaster"
import "tailwindcss/tailwind.css"
import { Auth0Provider } from "@auth0/auth0-react"

export default function MyApp({
  Component,
  pageProps: { accessToken, ...pageProps },
}: AppProps<{ accessToken?: string }>) {
  const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
  if (!auth0ClientId) {
    throw new Error(`
    Missing NEXT_PUBLIC_AUTH0_CLIENT_ID env`)
  }
  const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN
  if (!auth0Domain) {
    throw new Error(`
    Missing NEXT_PUBLIC_AUTH0_DOMAIN env`)
  }
  const auth0Audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
  if (!auth0Audience) {
    throw new Error(`
    Missing NEXT_PUBLIC_AUTH0_AUDIENCE env`)
  }
  return (
    <I18nProvider>
      <IdProvider>
        <Head>
          <title>Perfolio</title>
        </Head>
        <Auth0Provider
          domain={auth0Domain}
          clientId={auth0ClientId}
          redirectUri={typeof window !== "undefined" ? window.location.origin : "/"}
          cacheLocation="localstorage"
          audience={auth0Audience}
          useRefreshToken={true}
        >
          <ToastProvider>
            <QueryClientProvider client={PersistendQueryClient()}>
              <div className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
                <Component {...pageProps} />
              </div>
            </QueryClientProvider>
          </ToastProvider>
        </Auth0Provider>
      </IdProvider>
    </I18nProvider>
  )
}
