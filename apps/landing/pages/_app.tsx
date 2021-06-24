import React from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import PlausibleProvider from "next-plausible"
import { ApiProvider } from "@perfolio/data-access/api-client"
import "tailwindcss/tailwind.css"

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="perfol.io">
      <Head>
        <title>Perfolio</title>
        <meta name="description" content="Insights. For Everyone." />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png"></link>
      </Head>
      <ApiProvider>
        <Component {...pageProps} />
      </ApiProvider>
    </PlausibleProvider>
  )
}

export default CustomApp
