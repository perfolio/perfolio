import "tailwindcss/tailwind.css"
import React from "react"
import Head from "next/head"
import { ThemeProvider } from "next-themes"
import * as Sentry from "@sentry/nextjs"
import { Integrations } from "@sentry/tracing"
import { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Header } from "@perfolio/components"
Sentry.init({
  dsn: process.env["NEXT_PUBLIC_SENTRY_DSN"],
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1,
  release: process.env["RELEASE"] ?? "dev",
})

/**
 * Main entry point.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchInterval: 15_000,
            },
          },
        })
      }
    >
      <Head>
        <title>Perfolio</title>
        <meta name="description" content="Portfolio analysis for everyone" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>
      <ThemeProvider attribute="class">
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp
