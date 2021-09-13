import type { AppProps } from "next/app"
import { QueryClientProvider } from "react-query"
import { PersistendQueryClient } from "@perfolio/app/query-client"
import Head from "next/head"
import { IdProvider } from "@radix-ui/react-id"
import { AuthProvider } from "@perfolio/auth"
import { I18nProvider } from "@perfolio/feature/i18n"
import { ToastProvider } from "@perfolio/toaster"
import "tailwindcss/tailwind.css"

function MyApp({
  Component,
  pageProps: { accessToken, ...pageProps },
}: AppProps<{ accessToken?: string }>) {
  return (
    <I18nProvider>
      <Head>
        <title>Perfolio</title>
      </Head>

      <IdProvider>
        <ToastProvider>
          <AuthProvider accessToken={accessToken}>
            <QueryClientProvider client={PersistendQueryClient()}>
              <div className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
                <Component {...pageProps} />
              </div>
            </QueryClientProvider>
          </AuthProvider>
        </ToastProvider>
      </IdProvider>
    </I18nProvider>
  )
}
export default MyApp
