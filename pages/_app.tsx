import "tailwindcss/tailwind.css"
import "../public/fonts/css/satoshi.css"
import { I18nProvider } from "next-localization"
import { useRouter } from "next/router"

import type { AppProps } from "next/app"

import { Auth0Provider } from "@auth0/auth0-react"

import { PersistendQueryClient } from "@perfolio/pkg/query-client"
import { ToastProvider } from "@perfolio/pkg/toaster"
import { PageloadIndicator } from "@perfolio/ui/components"
import { IdProvider } from "@radix-ui/react-id"
import { QueryClientProvider } from "react-query"

const Perfolio = ({
  Component,
  pageProps: { accessToken, ...pageProps },
}: AppProps<{ accessToken?: string }>) => {
  const auth0ClientId = process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]
  if (!auth0ClientId) {
    throw new Error(`
    Missing NEXT_PUBLIC_AUTH0_CLIENT_ID env`)
  }
  const auth0Domain = process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]
  if (!auth0Domain) {
    throw new Error(`
    Missing NEXT_PUBLIC_AUTH0_DOMAIN env`)
  }
  const auth0Audience = process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"]
  if (!auth0Audience) {
    throw new Error(`
    Missing NEXT_PUBLIC_AUTH0_AUDIENCE env`)
  }

  const redirectUri = `${
    typeof window !== "undefined" ? window.location.origin : "https://perfol.io"
  }/dashboard`

  const router = useRouter()
  const { translations, ...rest } = pageProps
  return (
    <I18nProvider lngDict={translations} locale={router.locale ?? "en"}>
      <IdProvider>
        <Auth0Provider
          domain={auth0Domain}
          clientId={auth0ClientId}
          redirectUri={redirectUri}
          cacheLocation="localstorage"
          audience={auth0Audience}
          useRefreshToken={true}
        >
          <ToastProvider>
            <QueryClientProvider client={PersistendQueryClient()}>
              <div className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
                <PageloadIndicator />
                <Component {...rest} />
              </div>
            </QueryClientProvider>
          </ToastProvider>
        </Auth0Provider>
      </IdProvider>
    </I18nProvider>
  )
}

export default Perfolio
