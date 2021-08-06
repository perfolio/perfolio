import type { AppProps } from "next/app"
import { QueryClientProvider } from "react-query"
import { PersistendQueryClient } from "@perfolio/app/query-client"
import Head from "next/head"
import { OnboardingModal } from "@perfolio/app/middleware"
import { IdProvider } from "@radix-ui/react-id"
import { Auth0Provider } from "@auth0/auth0-react"
import "tailwindcss/tailwind.css"

function MyApp({ Component, pageProps }: AppProps) {
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
    <>
      <Head>
        <title>Perfolio</title>
        <meta name="description" content="Insights. For Everyone." />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/fav/favicon_96x96_dark_mode.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/fav/favicon_32x32_dark_mode.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/fav/favicon_16x16_dark_mode.png"
        ></link>
      </Head>
      <IdProvider>
        <Auth0Provider
          domain={auth0Domain}
          clientId={auth0ClientId}
          redirectUri={typeof window !== "undefined" ? window.location.origin : "/"}
          cacheLocation="localstorage"
          audience={auth0Audience}
          useRefreshToken={true}
        >
          <QueryClientProvider client={PersistendQueryClient()}>
            <OnboardingModal />
            <div className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
              <Component {...pageProps} />
            </div>
          </QueryClientProvider>
        </Auth0Provider>
      </IdProvider>
    </>
  )
}
export default MyApp
